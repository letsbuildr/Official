const requestIp = require('request-ip');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

const GEO_CACHE_TTL_MS =
  parseInt(process.env.GEO_CACHE_TTL_MS, 10) || 24 * 60 * 60 * 1000; // 24h default
const geoCache = new Map(); // { ip: { countryCode, expiresAt } }

async function lookupCountryByIP(ip) {
  // Try cache
  const cached = geoCache.get(ip);
  if (cached && cached.expiresAt > Date.now()) return cached.countryCode;

  try {
    // Replace ipapi.co with your service of choice or MaxMind if local DB
    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 2000,
    });
    const countryCode =
      data && data.country_code ? data.country_code.toUpperCase() : null;

    if (countryCode) {
      geoCache.set(ip, {
        countryCode,
        expiresAt: Date.now() + GEO_CACHE_TTL_MS,
      });
      return countryCode;
    }
  } catch (err) {
    // silent fall-through to null
    console.error('Geo lookup error:', err.message);
  }
  return null;
}

module.exports = function detectLocation(options = {}) {
  return catchAsync(async (req, res, next) => {
    // 1) Manual override (query or header)
    const forcedRegion =
      req.query.region || req.get('X-Region') || req.get('x-region');
    if (forcedRegion) {
      req.countryCode = String(forcedRegion).toUpperCase();
      return next();
    }

    // 2) Development fallback
    if (process.env.NODE_ENV === 'development') {
      const devRegion = process.env.DEV_REGION;
      if (devRegion) {
        req.countryCode = devRegion.toUpperCase();
        console.log(
          `(dev) IP: ${req.ip || 'unknown'} | Country: ${req.countryCode}`
        );
        return next();
      }
    }

    // 3) Extract client IP
    const ip =
      requestIp.getClientIp(req) ||
      options.devFallbackIP ||
      req.ip ||
      '8.8.8.8';
    const isLocalhost = ['::1', '127.0.0.1', '::ffff:127.0.0.1'].includes(ip);
    const lookupIP = isLocalhost
      ? options.devFallbackIP || process.env.DEV_FALLBACK_IP || '8.8.8.8'
      : ip;

    if (process.env.NODE_ENV === 'development') {
      console.log(`Client IP: ${ip}, Lookup IP: ${lookupIP}`);
    }

    // 4) Perform lookup
    const country = await lookupCountryByIP(lookupIP);
    req.countryCode = (country || 'US').toUpperCase();

    if (process.env.NODE_ENV === 'development') {
      console.log(`Detected Country: ${req.countryCode}`);
    }

    next();
  });
};
