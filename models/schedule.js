const mongoose = require('mongoose');
const slug = require('../lib/slug.js');

const DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[0-1])$/;

const validateDayOrDate = [function validateDayOrDate(arrayOfVals) {
  const validationFunction = this.definite ?
    function validateDate(val) { return DATE_REGEX.test(val); } :
    function validateDay(val) { return DAYS_OF_THE_WEEK.indexOf(val) >= 0; };

  return arrayOfVals.every(validationFunction);
}, '{PATH} had at least one element that was incorrectly formatted or invalid.'];

const Schedule = new mongoose.Schema({
  title: String, // The human-readable name of the schedule
  slug: { type: String, index: true, default: () => { return slug.generate(); } }, // The slug used in the URL to direct others to this schedule

  definite: Boolean, // Whether the scheduling is for specific dates or just days of the week
  days: { type: [String], required: true, validate: validateDayOrDate },

  timezone: String, // Which timezone this schedule is based in
  startTime: { type: Number, min: 0, max: 86400 }, // What time each day scheduling begins (in seconds after midnight)
  endTime: { type: Number, min: 0, max: 86400 }, // What time each day scheduling ends (in seconds after midnight)
});

module.exports = mongoose.model('Schedule', Schedule);
