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
      'service-purchased',
      'service-progress',
      'consultation',
      'payment',
      'session-booked',
      'new-user-registered',
      'user-upgraded',
      'profile-update',
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
