const crypto = require('crypto');
const Booking = require('../models/bookingModel');
const Service = require('../models/serviceModel');
const Activity = require('../models/activityModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.initBooking = catchAsync(async (req, res, next) => {
  const user = req.user || null;
  // const timezone = req.timezone || 'UTC';

  const services = await Service.find({ active: true }).select('name _id');

  // If user is logged in, return their data
  const userInfo = user
    ? {
        loggedIn: true,
        fullname: user.name,
        email: user.email,
        userId: user._id,
      }
    : {
        loggedIn: false,
        fullname: '',
        email: '',
        userId: null,
      };

  // date generation
  const daysToCheck = 14; // next 14 days
  const today = new Date();
  const availableSlots = {};

  for (let i = 1; i <= daysToCheck; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // Skip weekends
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0 || day == 6) continue;

    // Generate possible time slots
    const possibleSlots = [];
    for (let hour = 8; hour <= 15; hour++) {
      if (hour === 12) continue; // skip lunch hour
      // if (hour === 16) continue; // Not available

      for (let minute of [0, 30]) {
        const hh = String(hour).padStart(2, '0');
        const min = String(minute).padStart(2, '0');

        possibleSlots.push(`${hh}:${min}`);
      }
    }

    // Removed already booked times
    const bookings = await Booking.find({
      date: dateStr,
      isCancelled: { $ne: true },
    }).select('time');

    const bookedTimes = bookings.map((b) => b.time);
    const finalSLots = possibleSlots.filter((t) => !bookedTimes.includes(t));

    if (finalSLots.length > 0) {
      availableSlots[dateStr] = finalSLots;
    }
  }

  res.status(200).json({
    status: 'success',
    ...userInfo,
    services,
    availableSlots,
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const { fullName, email, time, service, date, timeZone, message } = req.body;
  const user = res.locals.user ? res.locals.user._id : null;

  // if logged in, overwrite payload with user's info
  const bookingName = res.locals.user ? res.locals.user.name : fullName;
  const bookingEmail = res.locals.user ? res.locals.user.email : email;

  // Basic validation
  if (!bookingName || !bookingEmail || !time || !service || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const generateSlotsForDate = () => {
    const slots = [];

    for (let hour = 8; hour <= 15; hour++) {
      if (hour === 12) continue; // skip lunch hour
      for (let minute of [0, 30]) {
        slots.push(
          `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        );
      }
    }
    return slots;
  };

  const allowedSlotsForDate = generateSlotsForDate();
  if (!allowedSlotsForDate.includes(time)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid time! Please pick a valid time slot.',
    });
  }

  const existing = await Booking.findOne({
    date,
    time,
    isCancelled: false,
    isVerified: true,
  });

  if (existing) {
    return res.status(400).json({
      status: 'fail',
      message: 'This time slot is already booked. Please choose another slot.',
    });
  }

  // Generate a verification token
  const otp = Math.floor(100000 + Math.random() * 900000); //six digit otp
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Create booking
  const booking = await Booking.create({
    fullName: bookingName,
    email: bookingEmail,
    user,
    service,
    time,
    date,
    timeZone,
    message,
    otp,
    otpExpires,
  });

  const emailMessage = `Booking created! Your verification code is: ${otp} \nThis code is valid for 10 minutes. If you did not make this booking, please ignore this email.`;
  try {
    await sendEmail({
      email: booking.email,
      subject: 'Verify your booking',
      message: emailMessage,
    });
  } catch (err) {
    console.err(err);
  }
  res.status(201).json({
    status: 'success',
    message: `Booking created! Verification token sent to email.`,
    bookingId: booking._id,
  });
});

exports.verifyBooking = catchAsync(async (req, res) => {
  const { bookingId, otp } = req.body;
  console.log(req.params);

  const booking = await Booking.findOne({
    _id: bookingId,
    otp: Number(otp),
    otpExpires: { $gt: Date.now() },
    isCancelled: false,
  });

  if (!booking) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  booking.isVerified = true;
  booking.otp = undefined;
  booking.otpExpires = undefined;

  await booking.save();

  // const firstNameRaw = await Booking.findOne({ _id: bookingId }).fullName.split(
  //   ' '
  // )[0];
  const firstNameRaw = booking.fullName.split(' ')[0];
  const firstName =
    firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1).toLowerCase();

  const serviceDoc = await Service.findById({ _id: booking.service });
  const serviceName = serviceDoc.name;

  const emailMessage = `Hi ${firstName},\n\nYour session has been successfully booked - thank you for choosing Bomcel Digital!\n\nHere are the details of your session:\n\nDate: ${booking.date}\nTime: ${booking.time}\nService: ${serviceName}\nChannel: Google Meet\n\nPlease ensure you are available at the scheduled time. A reminder will be sent before your session begins.\n\nIf you need to reschedule or have any questions, you can reply directly to this email - the Bomcel Digital team is always here to support you.\n\nWarm regards,\nBomcelDigital`;
  try {
    await sendEmail({
      email: booking.email,
      subject: 'Your Session Has Been Successfully Booked',
      message: emailMessage,
    });
  } catch (err) {
    console.err(err);
  }

  await User.findByIdAndUpdate(booking.user, {
    $push: {
      activities: {
        refId: booking._id,
        type: 'consultation',
        metadata: {
          bookingId,
          service: serviceName,
          status: 'scheduled',
          date: booking.date,
          time: booking.time,
          message: booking.message,
          timestamp: Date.now(),
        },
      },
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Booking verified successfully!',
    bookingId: booking._id,
  });
});

exports.cancelBooking = catchAsync(async (req, res) => {
  // console.log(req.body);
  const { bookingId } = req.body;

  const booking = await Booking.findOne({ _id: bookingId, isCancelled: false });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  booking.isCancelled = true;
  booking.status = 'cancelled';
  await booking.save();

  await User.updateOne(
    { _id: booking.user, 'activities.refId': booking.id },
    {
      $set: {
        'activities.$.metadata.status': 'cancelled',
        'activities.$.metadata.cancelledAt': new Date(),
        'activities.$.updatedAt': new Date(),
      },
    }
  );

  const emailMessage = `Your booking on ${booking.date} at ${booking.time} has been successfully cancelled. If you have any questions, feel free to contact us.`;
  try {
    await sendEmail({
      email: booking.email,
      subject: 'Booking Cancelled',
      message: emailMessage,
    });
  } catch (err) {
    console.err(err);
  }

  res.json({ message: 'Booking cancelled successfully' });
});
