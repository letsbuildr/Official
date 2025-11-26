const express = require('express');
const bookingController = require('../controllers/bookingController');
const checkLoggedInUser = require('../middlewares/checkLoggedInUser');
const authController = require('../controllers/authController');

const router = express.Router();

// check if logged in, but don’t require it
router.use(checkLoggedInUser.isLoggedIn);

router.route('/init').get(bookingController.initBooking); // anyone can book
router.route('/createBooking').post(bookingController.createBooking); // anyone can book

router.route('/verify').post(bookingController.verifyBooking);

router.route('/cancel').post(bookingController.cancelBooking);

// router.route('/availability').get(bookingController.getAvailableSlots);

// Calendly webhook (don’t require login)
// router.route('/calendly/webhook').post(bookingController.handleCalendlyWebhook);

module.exports = router;
