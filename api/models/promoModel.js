const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
  oldPrices: [
    {
      planId: String,
      usd: Number,
      ngn: Number,
    },
  ],
  expiresAt: Date,
});

const Promo = mongoose.model('Promo', promoSchema);
module.exports = Promo;
