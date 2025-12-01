const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const Payment = require('../models/paymentModel');
const Activity = require('../models/activityModel');
const ServiceOrder = require('../models/serviceOrder');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.paystackWebhook = catchAsync(async (req, res, next) => {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;

  const payload = req.body;
  /* const signature = crypto
    .createHmac('sha512', secret)
    .update(payload)
    .digest('hex');

  if (signature !== req.headers['x-paystack-signature']) {
    return next(new AppError('Invalid signature', 401));
  }
*/
  const event = JSON.parse(payload);
  const payment = await Payment.findOne({
    transactionRef: event.data.reference,
  });
  if (!payment) {
    return next(new AppError('Payment not found', 404));
  }

  payment.paymentStatus =
    event.event === 'charge.success' ? 'success' : 'failed';
  payment.rawResponse = event;
  payment.paidAt = event.data.paid_at;
  await payment.save();

  await Activity.findByIdAndUpdate(payment.activityId, {
    $set: {
      'metadata.status':
        event.event === 'charge.success' ? 'completed' : 'failed',
      updatedAt: new Date(),
    },
  });

  await ServiceOrder.create({
    user: payment.user,
    service: payment.service,
    progress: 0,
    status: 'ongoing',
    metadata: {
      paymentId: payment._id,
      timeStamp: Date.now(),
    },
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Webhook processed successfully' });
});
