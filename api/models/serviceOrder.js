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
    progress: {
      type: Number,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot be more than 100'],
      default: 0,
      validate: {
        validator: function (value) {
          if (this instanceof mongoose.Query) return true; //skip on updates
          if (value === undefined) return true; //progress is optional
          return this.role === 'user';
        },
        message: 'Only regular users can have progress value',
      },
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'cancelled'],
      default: 'ongoing',
    },
    metadata: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceOrder', serviceOrderSchema);
