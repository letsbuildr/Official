const sharp = require('sharp');
const User = require('../models/userModel');
const ServiceOrder = require('../models/serviceOrder');
const Activity = require('../models/activityModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates, please use /updateMyPassword',
        400
      )
    );
  }

  // 2) Filter out unwanted fields that are not allowed to be updated(allow only these)
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: 'success',
    data: { user: updatedUser },
  });
});

exports.updateUserProgress = catchAsync(async (req, res, next) => {
  const { progress } = req.body;

  // Ensure request is from an instructor
  if (req.user.role !== 'freelancer') {
    return next(new AppError('Only freelancers can update user progress', 403));
  }

  // Find the target user to update
  const order = await ServiceOrder.findById(req.params.id);
  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  const targetUser = await User.findById(order.user);
  if (!targetUser || targetUser.role !== 'user') {
    return next(
      new AppError('Can only update progress for regular users', 400)
    );
  }

  // Prevent decreasing progress
  if (progress <= order.progress) {
    return next(
      new AppError(
        'Progress cannot be less than or equal to current value',
        400
      )
    );
  }

  order.progress = progress;
  if (progress === 100) order.status = 'completed';

  await Activity.create({
    user: order.user,
    type: 'service-progress',
    metadata: {
      orderId: order._id,
      progress,
      status: order.status,
      timeStamp: Date.now(),
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    message: 'success',
    data: null,
  });
});

// Get current logged in user data
exports.getMe = catchAsync(async (req, res, next) => {
  // console.log('id:' req.user.id);
  // req.params.id = req.user.id;
  const user = await User.findById(req.user.id)
    .populate({
      path: 'activities',
      options: { sort: { createdAt: -1 }, limit: 10 },
    })
    .populate({
      path: 'bookings',
      options: { sort: { createdAt: -1 } },
    })
    .populate('serviceOrders');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined, please use /signup',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
