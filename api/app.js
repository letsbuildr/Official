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
const detectLocation = require('./middlewares/detectLocation');
const { paystackWebhook } = require('./webhooks/paystack');

const app = express();

app.post(
  '/api/v1/payments/webhook/paystack',
  express.raw({ type: 'application/json' }),
  paystackWebhook
);

app.use(
  cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public'))); //serving static files (without using a route)
// Development logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'child-src': ['blob:'],
      'connect-src': [
        'https://*.cloudflare.com',
        'http://localhost:3000',
        'http://localhost:5000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5000',
        'ws://127.0.0.1:*',
        'ws://localhost:1234/',
      ],
      'default-src': ["'self'", 'data:', 'blob', 'https', 'ws:'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https://unpkg.com',
        'https://res.cloudinary.com',
      ],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        'https://unpkg.com',
        'https://*.cloudflare.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5000',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https:',
        'https://fonts.googleapis.com',
      ],
      'worker-src': ['blob:'],
    },
  })
);

app.use(hpp());

if (process.env.NODE_ENV === 'development') {
  app.use('/api', rateLimit({ windowMs: 60 * 60 * 1000, max: 1000 }));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  // keyGenerator: (req, res) => ipKeyGenerator(this.request), //ensure ip is correctly used
  keyGenerator: (req) => req.ip,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading requests from body to req.body
app.use(express.json({ limit: '10kb' })); //
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.set('trust proxy', false); //TODO: change to 1 before deployment
app.use(detectLocation({ devFallbackIP: process.env.DEV_FALLBACK_IP }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/payments', paymentRouter);

module.exports = app;
