const mongoose = require('mongoose');

const blockedTimeSchema = new mongoose.Schema({
  date: { type: String, required: false },
  dayOfWeek: { type: Number, required: false },
  blockedSlots: [String],
  label: String,
  notes: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BlockedTime', blockedTimeSchema);
