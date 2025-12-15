const express = require('express');
const authController = require('../controllers/authController');
const protectRoute = require('../middlewares/protectRoute');
const restrictRoute = require('../middlewares/restrictRoute');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(protectRoute.protect, restrictRoute.restrictTo('admin'));

router.get('/overview', adminController.getOverview);
router.get('/users', adminController.getAllUsers);
router.get('/analytics', adminController.getAnalytics);
router.get('/pendingConsultations', adminController.getPendingConsultations);
router.get('/pricingOverview', adminController.getPricingOverview);

router.patch('/updateRole', adminController.updateUserRole);
router.patch('/deactivateUser/:id', adminController.deactivateUser);
router.patch('/reactivateUser/:id', adminController.reactivateUser);
router.patch('/updateServicePrice/:id', adminController.updateServicePrice);
router.patch(
  '/applyInflationAdjustment',
  adminController.applyInflationAdjustment
);
router.patch('/applyPromoAdjustment', adminController.applyPromoAdjustment);

router.delete('/deleteUser', adminController.deleteUser);

module.exports = router;
