const mongoose = require('mongoose');

const serviceOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    planType: {
      type: String,
      required: [true, 'Service order must have a plan type'],
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    progress: {
      type: Number,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot be more than 100'],
      default: 0,
      validate: {
        validator: async function (value) {
          if (this.metadata?.createdByWebhook === true) return true; //skip validation if created by webhook
          // return true; //temporarily allow all for now

          return this.userRole === 'user';
        },
        message: 'Only regular users can have progress value',
        // message: 'Progress validation prevented by webhook',
      },
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'cancelled'],
      default: 'ongoing',
    },
    updatedAt: Date,
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceOrder', serviceOrderSchema);
