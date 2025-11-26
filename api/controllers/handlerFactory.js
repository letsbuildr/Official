const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body); //Model.create() will return a promise. req.body is the data that is being created **

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query;

    if (req.params.slug) {
      query = Model.findOne({ slug: req.params.slug });
    } else if (req.params.id) {
      query = Model.findById(req.params.id);
    } else {
      return next(new AppError('No identifier provided', 400));
    }

    if (popOptions) query = query.populate(popOptions);

    let doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that identifier', 404));
    }

    // automatic price filtering for service model
    if (Model.modelName === 'Service' && req.filterPricesByCountry) {
      doc = req.filterPricesByCountry(doc);
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.query);

    let filter = {};
    if (req.params.serviceId) filter = { service: req.params.serviceId };
    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    let docs = await features.query;
    // query.sort().select().skip().limit()

    if (options.postProcess) {
      docs = options.postProcess(docs, req);
    }

    // automatic price filtering for service model
    if (Model.modelName === 'Service' && req.filterPricesByCountry) {
      docs = req.filterPricesByCountry(docs);
    }

    // SEND MESSAGE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
