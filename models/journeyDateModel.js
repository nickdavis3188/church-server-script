const mongoose = require('mongoose');

const journeyDateSchema = mongoose.Schema(
  {
    journeyDate:Date
  },{ timestamps: true });

module.exports = mongoose.model('JourneyDate', journeyDateSchema);