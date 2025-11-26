const express = require('express');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');
const protectRoute = require('../middlewares/protectRoute');
const restrictRoute = require('../middlewares/restrictRoute');
const paystackWebhook = require('../webhooks/paystack');
const router = express.Router();

// router.post(
//   '/webhook/paystack',
//   express.raw({ type: '/application/json' }).paystackWebhook.paystackWebhook
// );

router.use(protectRoute.protect);

router.post('/start', paymentController.startPayment);
// router.get('/verify')

module.exports = router;
