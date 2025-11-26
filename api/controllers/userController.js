const sharp = require('sharp');
const User = require('../models/userModel');
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
  if (req.user.role !== 'instructor') {
    return next(new AppError('Only instructors can update user progress', 403));
  }

  // Find the target user to update
  const targetUser = await User.findById(req.params.id);
  if (!targetUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  // Ensure target user is a regular user
  if (targetUser.role !== 'user') {
    return next(
      new AppError('Can only update progress for regular users', 400)
    );
  }

  // Prevent decreasing progress
  if (progress <= targetUser.progress) {
    return next(
      new AppError(
        'Progress cannot be less than or equal to current value',
        400
      )
    );
  }
  // Update progress
  // targetUser.progress = progress;
  // await targetUser.save();
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { progress },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
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
exports.getMe = (req, res, next) => {
  // console.log('id:' req.user.id);
  req.params.id = req.user.id;
  next();
};

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
