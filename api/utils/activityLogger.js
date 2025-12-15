const Activity = require('../models/activityModel');
const AppError = require('./appError');

exports.logActivity = async (userId, type, metadata = {}) => {
  if (!userId) {
    throw new AppError('logActitivity: userId is required', 500);
  }

  if (!type) {
    throw new AppError('logActitivity: activity type is required', 500);
  }

  const validTypes = [
    //user
    'new-user-registered',
    'user-upgraded',
    'profile-update',
    'user-deactivated',
    'user-reactivated',

    //consultations
    'consultation-booked',
    'consultation-cancelled',
    'consultation-completed',

    // admin actions
    'admin-booking-cancelled',
    'admin-booking-comepleted',

    //services
    'service-purchased',
    'service-progress-updated',
    'service-progress-completed',
    'service-price-updated',
    'price-adjustment',
    'promo-adjustment',

    // Payments
    'payment-pending',
    'payment-successful',
    'payment-failed',
  ];

  if (!validTypes.includes(type)) {
    throw new AppError(`logActitivity: invalid activity type "${type}"`, 500);
  }

  const activity = await Activity.create({
    user: userId,
    type,
    metadata,
    createdAt: Date.now(),
  });

  return activity;
};
