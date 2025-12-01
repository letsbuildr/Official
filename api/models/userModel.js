const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please input your name!'],
      validate: {
        validator: function (val) {
          // At least two words, only letters and optional spaces/hyphens
          return /^[A-Za-z]+(?:[\s\-][A-Za-z]+)+$/.test(val.trim());
        },
        message: 'Please input your full name',
      },
    },

    username: {
      type: String,
      required: [true, 'Please input your username!'],
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please input your email address'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'freelancer'],
      default: 'user',
    },

    serviceOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceOrder',
      },
    ],

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE SAVE!
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords do not match!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { active: true } }
);

userSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { active: true } }
);

userSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'user',
  localField: '_id',
  justOne: false,
});

userSchema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'user',
});

userSchema.virtual('serviceOrdersCount', {
  ref: 'ServiceOrder',
  localField: 'id',
  foreignField: 'user',
  count: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Handle duplicate key errors for username and email
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'Mongo ServerError' && error.code === 11000) {
    next(new Error('Username is already taken!'));
  } else {
    next(error);
  }
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp; //JWTTimestamp= date when token was created; changedTimeStamp= date when password was changed. If this returns true, it means JWTTimestamp was issued at an ealier date, therefore password was changed.
  }

  return false;
};

// Capitalize first letter of each word in name before saving
userSchema.pre('save', function (next) {
  if (!this.name) return next();

  this.name = this.name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.name = update.name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    this.setUpdate(update);
  }
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
