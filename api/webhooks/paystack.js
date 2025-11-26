const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const Payment = require('../models/paymentModel');
const Activity = require('../models/activityModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.paystackWebhook = catchAsync(async (req, res, next) => {
  // console.log(' WEBHOOK HIT:', {
  //   rawBody: req.body,
  //   headers: req.headers,
  // });

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

  payment.status = event.event === 'charge.success' ? 'success' : 'failed';
  payment.rawResponse = event;
  payment.paidAt = event.data.paid_at;
  await payment.save();

  await User.findByIdAndUpdate(payment.user, {
    $push: {
      activities: {
        refId: payment._id,
        type: 'service purchase',
        metadata: {
          paymentId: payment._id,
          service: payment.service,
          status: event.event === 'charge.success' ? 'Completed' : 'Failed',
          date: payment.createdAt,
          amount: payment.amount,
          transactionRef: payment.transactionRef,
          currency: payment.currency,
          paymentMethod: payment.PaymentMethod,
        },
      },
    },
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Webhook processed successfully' });
});
