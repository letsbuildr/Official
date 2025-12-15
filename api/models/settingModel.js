const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: mongoose.Schema.Types.Mixed,
});

settingSchema.statics.get = async function (key, defaultValue = null) {
  const s = await this.findOne({ key });
  return s ? s.value : defaultValue;
};
settingSchema.statics.set = async function (key, value) {
  return this.findOneAndUpdate({ key }, { value }, { new: true, upsert: true });
};

module.exports = mongoose.model('Setting', settingSchema);
