const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: false,
  },
  action: {
    type: String,
    required: true,
    enum: [
      'updated-user-role-to-freelancer',
      'updated-user-role-to-admin',
      'updated-user-role-to-user',
      'deactivated-user',
      'reactivated-user',
      'deleted-user',
      'completed-consultation-session',
      'cancelled-consultation-session',
      'deleted-user',
      'service-price-updated',
      'price-adjustment',
      'promo-adjustment',
    ],
  },
  metadata: {
    type: Object,
    default: {},
  },
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

auditSchema.index({ createdAt: -1 });
auditSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Audit', auditSchema);
