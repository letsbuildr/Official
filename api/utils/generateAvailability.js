const Booking = require('../models/bookingModel');

exports.generateAvailability = async (daysToCheck = 14) => {
  const today = new Date();
  const availableSlots = {};

  for (let i = 1; i <= daysToCheck; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];

    // Skip weekends
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0 || day == 6) continue;

    // Generate possible time slots
    const possibleSlots = [];
    for (let hour = 8; hour <= 15; hour++) {
      if (hour === 12) continue; // skip lunch hour
      // if (hour === 16) continue; // Not available

      for (let minute of [0, 30]) {
        possibleSlots.push(
          `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        );
      }
    }

    // Remove booked slots
    const bookings = await Booking.find({
      date: dateStr,
      isCancelled: { $ne: true },
    }).select('time');

    const bookedTimes = bookings.map((b) => b.time);
    const finalSlots = possibleSlots.filter((t) => !bookedTimes.includes(t));
    if (finalSlots.length > 0) {
      availableSlots[dateStr] = finalSlots;
    }
  }
  return availableSlots;
};
