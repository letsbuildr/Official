const Booking = require('../models/bookingModel');

exports.generateAvailability = async ({
  daysToCheck = 14,
  slotDuration = 30,
  unavailableDates = [],
  blockedTimes = [],
} = {}) => {
  const today = new Date();
  const availableSlots = {};

  // convert unavailable dates into a fast lookup map
  const unavailableMap = new Map();
  unavailableDates.forEach((u) => {
    unavailableMap.set(String(u.date), { type: u.type, reason: u.reason });
  });

  // Group blocked time rules by dates and by daysOfWeek
  const blockedByDate = new Map();
  const blockedByDay = new Map();

  blockedTimes.forEach((b) => {
    if (b.date) {
      const d = String(b.date); // ensure date is string
      if (!blockedByDate.has(d)) blockedByDate.set(d, []);
      blockedByDate.get(d).push(...b.blockedSlots);
    }
    if (typeof b.dayOfWeek === 'number') {
      if (!blockedByDay.has(b.dayOfWeek)) blockedByDay.set(b.dayOfWeek, []);
      blockedByDay.get(b.dayOfWeek).push(...b.blockedSlots);
    }
  });

  for (let i = 1; i <= daysToCheck; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];
    const day = date.getDay();

    if (day === 0 || day === 6) continue;

    //  If date is unvailable, mark it and skip times
    if (unavailableMap.has(dateStr)) {
      const u = unavailableMap.get(dateStr);
      availableSlots[dateStr] = {
        available: false,
        type: u.type,
        reason: u.reason || 'Unavailable',
        times: [],
      };
      continue;
    }

    // Generate timeSlots based on SlotDuration
    const possibleSlots = [];
    for (let hour = 8; hour <= 15; hour++) {
      if (hour === 12) continue; //skip lunch

      for (let minute = 0; minute < 60; minute += slotDuration) {
        if (minute >= 60) continue;

        possibleSlots.push(
          `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        );
      }
    }

    // remove blocked times for this exact date
    let blocked = new Set(blockedByDate.get(dateStr) || []);

    // remove blocked times for this dayofweek
    if (blockedByDay.has(day)) {
      blockedByDay.get(day).forEach((t) => blocked.add(t));
    }

    const bookings = await Booking.find({
      date: dateStr,
      isCancelled: { $ne: true },
    }).select('time');

    const bookedTimes = bookings.map((b) => b.time);

    // filter out booked and blocked times
    const finalSlots = possibleSlots.filter(
      (t) => !bookedTimes.includes(t) && !blocked.has(t)
    );

    availableSlots[dateStr] = {
      available: finalSlots.length > 0,
      reason: null,
      times: finalSlots,
    };
  }
  return availableSlots;
};
