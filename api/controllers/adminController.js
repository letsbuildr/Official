const User = require('../models/userModel');
const Service = require('../models/serviceModel');
const ServiceOrder = require('../models/serviceOrderModel');
const Audit = require('../models/auditModel');
const Activity = require('../models/activityModel');
const Setting = require('../models/settingModel');
const Booking = require('../models/bookingModel');
const Promo = require('../models/promoModel');

const { logActivity } = require('../utils/activityLogger');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const redis = require('../utils/redis');

const factory = require('./handlerFactory');

const CACHE_TTL_SECONDS = 600; //10 minutes

exports.getOverview = catchAsync(async (req, res, next) => {
  const CACHE_KEY = 'admin:overview';

  const cached = await redis.get(CACHE_KEY);
  if (cached) {
    return res.status(200).json({
      status: 'success',
      source: 'cache',
      data: JSON.parse(cached),
    });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalUsers = await User.countDocuments({ role: 'user' });
  const newUsersThisMonth = await User.countDocuments({
    role: 'user',
    createdAt: { $gte: startOfMonth },
  });

  const totalServices = await Service.countDocuments();
  const activeServiceUsers = await ServiceOrder.distinct('user');

  //Number of scheduled consultations
  // const totalConsultations = await Booking.countDocuments()
  const scheduledConsultations = await Booking.countDocuments({
    status: 'scheduled',
  });
  //   total revenue by amount
  const totalRevenueAgg = await ServiceOrder.aggregate([
    { $group: { _id: null, sum: { $sum: '$amountPaid' } } },
  ]);
  const totalRevenue = totalRevenueAgg[0]?.sum || 0;

  const recentActivities = await Activity.find()
    // .select('type user metadata createdAt')
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('user', 'name email')
    .lean();

  const activityLog = recentActivities.map((act) => ({
    user: act.user?.name || 'Unknown',
    type: act.type,
    createdAt: act.createdAt,
  }));

  // Top services by revenue
  const topServicesAgg = await ServiceOrder.aggregate([
    {
      $group: {
        _id: '$service',
        revenue: { $sum: '$amountPaid' },
        sales: { $sum: 1 },
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 },
  ]);

  const topServices = await Service.populate(topServicesAgg, {
    path: '_id',
    select: 'title category image',
  });

  const payload = {
    stats: {
      stats: {
        totalUsers,
        newUsersThisMonth,
        totalServices,
        activeServiceUsers: activeServiceUsers.length,
        scheduledConsultations,
        totalRevenue,
      },
      activityLog,
      topServices,
    },
  };

  await redis.setEx(CACHE_KEY, CACHE_TTL_SECONDS, JSON.stringify(payload));

  res.status(200).json({
    status: 'success',
    source: 'live',
    data: payload,
  });
});

exports.getAllUsers = factory.getAll(User);

exports.updateUserRole = catchAsync(async (req, res, next) => {
  const { userId, newRole } = req.body;
  const targetUser = await User.findById(userId);
  if (!targetUser) return next(new AppError('No user found with that ID', 404));
  const actor = res.locals.user._id;

  const oldRole = targetUser.role;
  if (newRole === oldRole)
    return next(
      new AppError('New role cannot be the same as existing role', 400)
    );

  const validRoles = ['user', 'freelancer', 'admin'];
  if (!validRoles.includes(newRole))
    return next(new AppError('Invalid Role', 400));

  targetUser.role = newRole;
  await targetUser.save({ validateBeforeSave: false });
  const action = `updated-user-role-to-${newRole}`;

  await Audit.create({
    actor,
    user: userId,
    action,
  });

  await logActivity(userId, 'user-upgraded', {
    oldRole,
    newRole,
  });

  res.status(200).json({
    status: 'success',
    data: {
      actor,
      userId,
      action,
      metadata: {
        oldRole,
        newRole,
      },
    },
  });
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = res.locals.user._id;
  const user = await User.findById(id).select('+active');

  if (!user) return next(new AppError('User not found', 404));
  if (user.active === false)
    return next(new AppError('User is already deactivated', 400));

  user.active = false;
  await user.save({ validateBeforeSave: false });
  await Audit.create({
    actor,
    user: id,
    action: 'deactivated-user',
  });

  await logActivity(id, 'user-deactivated');
  res.status(200).json({
    status: 'success',
    message: 'user deactivated',
  });
});

exports.reactivateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = res.locals.user._id;
  //   const user = await User.findByIdAndUpdate(
  //     id,
  //     { active: true },
  //     { new: true, runValidators: false }
  //   );
  const user = await User.findById(id)
    .setOptions({ bypassActive: true })
    .select('+active');
  if (!user) return next(new AppError('User not found', 404));

  if (user.active === true)
    return next(new AppError('User is already active', 400));

  user.active = true;
  await user.save({ validateBeforeSave: false });
  await Audit.create({
    actor,
    user: id,
    action: 'reactivated-user',
  });

  await logActivity(id, 'user-reactivated');
  res.status(200).json({
    status: 'success',
    message: 'user reactivated',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.body.id;
  const actor = res.locals.user._id;
  const targetUser = await User.findById(id);
  if (!targetUser) return next(new AppError('User not found', 404));

  await User.findByIdAndDelete(id);
  await Audit.create({
    actor,
    user: id,
    action: 'deleted-user',
  });

  res.status(200).json({
    status: 'success',
    messsage: 'user deleted',
  });
});

exports.getPendingConsultations = catchAsync(async (req, res, next) => {
  //range
  const rawRange = req.query.range || 30;
  let range = 30;
  const parsed = parseInt(rawRange, 10);

  if (!isNaN(parsed) && parsed > 0) {
    range = parsed;
  }
  const now = new Date();
  const rangeStart = new Date(now.getTime() - range * 24 * 60 * 60 * 1000);

  // get pending consultations
  const pending = await Booking.find({
    createdAt: { $gte: rangeStart },
    status: 'scheduled',
  })
    .populate('user', 'name email')
    .populate('service', 'name');

  return res.status(200).json({
    status: 'success',
    range,
    count: pending.length,
    data: pending,
  });
});

exports.getAnalytics = catchAsync(async (req, res, next) => {
  const rawRange = req.query.range || '30';
  let range = 30;
  if (rawRange !== undefined) {
    const parsed = parseInt(rawRange, 10);
    if (!isNaN(parsed) && parsed > 0) range = parsed;
  }
  const cacheKey = `admin:analytics:${range}`;

  // check cached redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.status(200).json({
      status: 'success',
      source: 'cache',
      data: JSON.parse(cached),
    });
  }

  const now = new Date();
  // const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const rangeStart = new Date(now.getTime() - range * 24 * 60 * 60 * 1000);
  const prevRangeStart = new Date(
    rangeStart.getTime() - range * 24 * 60 * 60 * 1000
  );

  //1) stats
  // users
  const [totalUsers, newUsers] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    User.countDocuments({ createdAt: { $gte: rangeStart }, role: 'user' }),
  ]);
  // services
  const [totalServices, activeServices] = await Promise.all([
    Service.countDocuments(),
    Service.countDocuments({ active: true }),
  ]);

  //bookings
  const [totalConsultations, successfulConsultations] = await Promise.all([
    Booking.countDocuments({ createdAt: { $gte: rangeStart } }),
    Booking.countDocuments({
      createdAt: { $gte: rangeStart },
      status: 'completed',
    }),
  ]);

  consultationSuccessRate =
    totalConsultations === 0
      ? 0
      : (successfulConsultations / totalConsultations) * 100;

  // revenue in range and in previous range
  const revAgg = await ServiceOrder.aggregate([
    { $match: { createdAt: { $gte: rangeStart } } },
    { $group: { _id: null, total: { $sum: '$amountPaid' } } },
  ]);
  const revenueThisRange = revAgg[0]?.total || 0;

  const prevRevAgg = await ServiceOrder.aggregate([
    { $match: { createdAt: { $gte: prevRangeStart, $lt: rangeStart } } },
    { $group: { _id: null, total: { $sum: '$amountPaid' } } },
  ]);
  const revenuPrevRange = prevRevAgg[0]?.total || 0;

  const revenueChange =
    revenuPrevRange === 0
      ? revenueThisRange === 0
        ? 0
        : 100
      : ((revenueThisRange - revenuPrevRange) / revenuPrevRange) * 100;

  const stats = {
    range,
    totalUsers,
    newUsers,
    totalServices,
    activeServices,
    totalConsultations,
    successfulConsultations,
    consultationSuccessRate,
    revenueThisRange,
    revenuPrevRange,
    revenueChange,
  };

  // 2) revenue trend
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 5);
  sixMonthsAgo.setDate(1); //start from first of that month

  const revenueTrendAgg = await ServiceOrder.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        total: { $sum: '$amountPaid' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  //normalize into 6-month list (oldest -> newest)
  const revenueTrend = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const found = revenueTrendAgg.find(
      (r) => r._id.year === year && r._id.month === month
    );
    revenueTrend.push({ year, month, total: found ? found.total : 0 });
  }

  //3)popular consultation days
  //use $dateFromString to group by day of the week
  const popularDaysAgg = await Booking.aggregate([
    {
      $addFields: {
        parsedDate: {
          $dateFromString: { dateString: '$date', format: '%Y-%m-%d' },
        },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: '$parsedDate' }, //1 = Sunday, 7 = Saturday
        count: { $sum: 1 },
      },
    },
  ]);

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const popularDays = dayNames.map((name, i) => {
    const found = popularDaysAgg.find((d) => d._id === i + 1);
    return { day: name, bookings: found ? found.count : 0 };
  });

  //4)popular services (unique buyers)
  const popularServicesAgg = await ServiceOrder.aggregate([
    {
      $group: {
        _id: '$service',
        buyers: { $addToSet: '$user' }, //unique users
      },
    },
    {
      $project: {
        service: '$_id',
        buyersCount: { $size: '$buyers' },
      },
    },
    { $sort: { buyersCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'services',
        localField: 'service',
        foreignField: '_id',
        as: 'serviceDoc',
      },
    },
    { $unwind: '$serviceDoc' },
    {
      $project: {
        serviceId: '$service',
        name: '$serviceDoc.name',
        buyersCount: 1,
      },
    },
  ]);

  //total unique buyers accross all service orders (for percentage)
  const totalUniqueBuyers = (await ServiceOrder.distinct('user')).length || 0;

  const popularServices = popularServicesAgg.map((s) => ({
    serviceId: s.serviceId,
    name: s.name || 'Unknown',
    totalUsers: s.buyersCount,
    percentage:
      totalUniqueBuyers === 0 ? 0 : (s.buyersCount / totalUniqueBuyers) * 100,
  }));

  //5) top 5 performing services by revenue (from service order)
  const topServicesAgg = await ServiceOrder.aggregate([
    {
      $group: {
        _id: '$service',
        totalRevenue: { $sum: '$amountPaid' },
        totalSales: { $sum: 1 },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'services',
        localField: '_id',
        foreignField: '_id',
        as: 'serviceDoc',
      },
    },
    { $unwind: '$serviceDoc' },
    {
      $project: {
        serviceId: '$_id',
        name: '$serviceDoc.name',
        totalRevenue: 1,
        totalSales: 1,
      },
    },
  ]);

  const topPerformingServices = topServicesAgg.map((t) => ({
    serviceId: t.serviceId,
    name: t.name,
    totalRevenue: t.totalRevenue,
    totalSales: t.totalSales,
  }));

  // final data sent
  const payload = {
    stats,
    revenueTrend,
    popularDays,
    popularServices,
    topPerformingServices,
  };

  await redis.setEx(cacheKey, CACHE_TTL_SECONDS, JSON.stringify(payload));

  res.status(200).json({
    status: 'success',
    source: 'live',
    data: payload,
  });
});

exports.getPricingOverview = catchAsync(async (req, res, next) => {
  const now = new Date();
  const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const prev30 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const services = await Service.find().select(
    'name pricingPackage.pricingPlans lastPriceUpdate'
  );

  const overview = [];
  for (const svc of services) {
    const currentSales = await ServiceOrder.countDocuments({
      service: svc._id,
      createdAt: { $gte: last30 },
    });

    const previousSales = await ServiceOrder.countDocuments({
      service: svc._id,
      createdAt: { $gte: prev30, $lt: last30 },
    });

    let trend = 'stable';
    if (previousSales === 0 && currentSales > 0) trend = 'up';
    else if (previousSales > 0) {
      const change = ((currentSales - previousSales) / previousSales) * 100;
      if (change > 10) trend = 'up';
      else if (change < -10) trend = 'down';
    }

    overview.push({
      serviceId: svc._id,
      name: svc.name,
      pricingPlans: svc.pricingPackage.pricingPlans,
      sales: currentSales,
      trend,
      lastPriceUpdate: svc.lastPriceUpdate,
    });
  }

  return res.status(200).json({
    status: 'success',
    count: overview.length,
    data: overview,
  });
});

exports.updateServicePrice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { plans } = req.body;
  const actor = res.locals.user._id;

  if (!Array.isArray(plans))
    return next(new AppError('Plans array is required', 400));

  const service = await Service.findById(id);
  if (!service) return next(new AppError('Service not found', 404));

  for (const update of plans) {
    const planId = update.planId || update._id;
    const plan = service.pricingPackage.pricingPlans.find(
      (p) => p._id.toString() === planId
    );
    if (plan) {
      if (update.price?.usd !== undefined) plan.price.usd = update.price.usd;
      if (update.price?.ngn !== undefined) plan.price.ngn = update.price.ngn;
    }
  }

  service.lastPriceUpdate = new Date();
  await service.save();

  await Audit.create({
    actor,
    service: id,
    action: 'service-price-updated',
  });

  await logActivity(actor, 'service-price-updated', {
    service: id,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Prices updated successfully',
  });
});

exports.applyInflationAdjustment = catchAsync(async (req, res, next) => {
  const { percentage, currency, reason } = req.body;
  const actor = res.locals.user._id;

  if (!percentage) return next(new AppError('Percentage rewquired', 400));
  const services = await Service.find();

  for (const svc of services) {
    svc.pricingPackage.pricingPlans.forEach((plan) => {
      if (currency === 'usd' || currency === 'all') {
        plan.price.usd = Math.round(
          plan.price.usd + (plan.price.usd * percentage) / 100
        );
      }
      if (currency === 'ngn' || currency === 'all') {
        const adjusted = plan.price.ngn + (plan.price.ngn * percentage) / 100;
        plan.price.ngn = Math.round(adjusted / 1000) * 1000;
      }
    });

    svc.lastPriceUpdate = new Date();
    await svc.save();

    await Audit.create({
      actor,
      service: svc._id,
      action: 'price-adjustment',
      metadata: {
        reason: `price-adjustment-${reason || 'inflation'}`,
      },
    });

    await logActivity(actor, 'price-adjustment', {
      service: svc._id,
    });
  }

  return res.status(200).json({
    status: 'success',
    meaasge: 'Inflation/bulk adjustment completed',
  });
});

exports.applyPromoAdjustment = catchAsync(async (req, res, next) => {
  const { percentage, durationDays, currency } = req.body;
  const actor = req.locals.user._id;

  if (!percentage || !durationDays)
    return next(new AppError('Percentage and durationDays required', 400));

  const services = await Service.find();

  for (const svc of services) {
    const backup = [];

    svc.pricingPackage.pricingPlans.forEach((plan) => {
      backup.push({
        planId: plan._id.toString(),
        usd: plan.price.usd,
        ngn: plan.price.ngn,
      });

      if (currency === 'usd' || currency === 'all') {
        plan.price.usd = Math.round(
          plan.price.usd - (plan.price.usd * percentage) / 100
        );
      }

      if (currency == 'ngn' || currency === 'all') {
        const discounted = plan.price.ngn - (plan.price.ngn * percentage) / 100;
        plan.price.ngn = Math.round(discounted / 1000) * 1000;
      }
    });

    scv.lastPriceUpdate = new Date();
    await svc.save();

    await Promo.create({
      service: svc._id,
      oldPrices: backup,
      expiresAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
    });

    await Audit.create({
      actor,
      service: svc._id,
      action: 'promo-adjustment',
    });

    await logActivity(actor, 'promo-price-adjustment', {
      service: svc._id,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Promotional pricing applied',
  });
});
