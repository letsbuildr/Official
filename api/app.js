const cors = require('cors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

const hpp = require('hpp');
const helmet = require('helmet');

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const adminRouter = require('./routes/adminRoutes');
const detectLocation = require('./middlewares/detectLocation');
const globalErrorHandler = require('./controllers/errorController');
const { paystackWebhook } = require('./webhooks/paystack');

const app = express();

app.use(
  cors({
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://official-rq5.onrender.com',
      'https://bomceldigital.com',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })
);

// webhook
app.post(
  '/api/v1/payments/webhook/paystack',
  express.raw({ type: 'application/json' }),
  paystackWebhook
);

// Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Body parser, reading requests from body to req.body
app.use(express.json({ limit: '10kb' })); //
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  // keyGenerator: (req, res) => ipKeyGenerator(this.request), //ensure ip is correctly used
  // keyGenerator: (req) => req.ip,
  keyGenerator: (req, res) => ipKeyGenerator(req),
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use('/api', rateLimit({ windowMs: 60 * 60 * 1000, max: 1000 }));
}

// Other middlwares
app.use(hpp());
// Serving static files
app.use(express.static(path.join(__dirname, 'public'))); //serving static files (without using a route)
if (process.env.NODE_ENV === 'development') {
  app.set('trust proxy', false);
} else {
  app.set('trust proxy', 1);
}
// app.set('trust proxy', false); //TODO: change to 1 before deployment

// Development logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
app.use(detectLocation({ devFallbackIP: process.env.DEV_FALLBACK_IP }));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/admin', adminRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// // global error middleware
app.use(globalErrorHandler);

module.exports = app;
