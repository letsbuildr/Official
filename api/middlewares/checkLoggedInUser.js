const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // 1) Verify token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    //  2) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    //  3) Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    // Attach user to req
    req.user = currentUser;

    // THERE IS A LOGGED IN USER
    res.locals.user = currentUser;
    console.log('Logged in user detected:', currentUser.email);
    return next();
  }
  next();
});
