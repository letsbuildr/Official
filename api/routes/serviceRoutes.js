const express = require('express');
const serviceController = require('../controllers/serviceController');
const restrictRoute = require('../middlewares/restrictRoute');
const filterCurrency = require('../middlewares/filterCurrency');

const router = express.Router();

router.use(filterCurrency);
router.get('/', serviceController.getAllServices);
router.get('/slug/:slug', serviceController.getService);

router.use(restrictRoute.restrictTo('admin'));
router.get(':id', serviceController.getService);
router.post('/', serviceController.createService);
router.patch('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
