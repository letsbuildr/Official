const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: [
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
    ],
  },
  metadata: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

activitySchema.index({ user: 1, createdAt: -1 });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
