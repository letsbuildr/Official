const axios = require('axios');
const Payment = require('../models/paymentModel');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.startPayment = catchAsync(async (req, res, next) => {
  const { serviceId, planType, currency } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) {
    return next(new AppError('Service not found', 404));
  }

  const plan = service.pricingPackage.pricingPlans.find(
    (p) => p.planTitle === planType
  );
  if (!plan) {
    return next(new AppError('Plan not found', 404));
  }

  const cur = currency.toUpperCase();
  const price = cur === 'NGN' ? plan.price.ngn : plan.price.usd;
  const reference = `svc_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const payment = await Payment.create({
    user: req.user._id,
    service: service._id,
    planType: plan.planTitle,
    amount: price,
    currency: cur,
    transactionRef: reference,
  });

  //   Initialize paystack
  const result = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email: req.user.email,
      amount: price * 100, // in kobo
      reference,
    },
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
  );

  res.status(200).json({
    status: 'success',
    message: 'Payment initialized',
    data: {
      paymentUrl: result.data.data.authorization_url,
      accessCode: result.data.data.access_code,
      reference,
    },
  });
});
