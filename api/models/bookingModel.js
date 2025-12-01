const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your name'],
    validate: {
      validator: function (val) {
        // At least two words, only letters and optional spaces/hyphens
        return /^[A-Za-z]+(?:[\s\-][A-Za-z]+)+$/.test(val.trim());
      },
      message: 'Please input your full name',
    },
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null,
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: [true, 'Please specify the service for the booking'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date for the booking'],
  },
  time: {
    type: String,
    required: [true, 'Please provide a time for the booking'],
  },
  timeZone: {
    type: String,
    default: 'UTC',
  },
  message: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  otp: Number,
  otpExpires: Date,
  lastOtpSentAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
