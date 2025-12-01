const express = require('express');
const bookingController = require('../controllers/bookingController');
const checkLoggedInUser = require('../middlewares/checkLoggedInUser');
const authController = require('../controllers/authController');

const router = express.Router();

// check if logged in, but don’t require it
router.use(checkLoggedInUser.isLoggedIn);

router.get('init', bookingController.initBooking); // anyone can book
router.post('/createBooking', bookingController.createBooking); // anyone can book
router.post('/regenerateOtp', bookingController.regenerateBookingOtp);
router.post('verify', bookingController.verifyBooking);
router.post('cancel', bookingController.cancelBooking);

// router.route('/availability').get(bookingController.getAvailableSlots);

// Calendly webhook (don’t require login)
// router.route('/calendly/webhook').post(bookingController.handleCalendlyWebhook);

module.exports = router;
