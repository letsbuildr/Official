const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const protectRoute = require('../middlewares/protectRoute');
const restrictRoute = require('../middlewares/restrictRoute');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/googleLogin', authController.googleLogin);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(protectRoute.protect);
// All routes after this middleware are protected
router.get('/me', userController.getMe, userController.getUser);
router.delete('/deleteMe', userController.deleteMe);

router.use(restrictRoute.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
