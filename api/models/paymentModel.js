const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Payment must be associated with a user'],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Payment must be associated with a service'],
  },
  planType: {
    type: String,
    required: [true, 'Payment must have a plan type'],
  },
  amount: {
    type: Number,
    required: [true, 'Payment must have an amount'],
  },
  currency: {
    type: String,
    default: 'NGN',
    required: [true, 'Payment must have a currency'],
  },
  paymentMethod: {
    type: String,
    default: 'Paystack',
    required: [true, 'Payment must have a payment method'],
  },
  transactionRef: {
    type: String,
    required: [true, 'Payment must have a transaction reference'],
    unique: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  rawResponse: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
