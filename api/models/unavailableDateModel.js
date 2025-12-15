const mongoose = require('mongoose');

const unavailableDateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['holiday', 'maintenance', 'other'],
    default: 'other',
  },
  reason: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UnavailableDate', unavailableDateSchema);
