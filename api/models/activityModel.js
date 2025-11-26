const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: [
      'Service Purchased',
      'Consultation Booked',
      'Payment Successful',
      'Payment Failed',
      'Session Booked',
    ],
  },
  metadata: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
