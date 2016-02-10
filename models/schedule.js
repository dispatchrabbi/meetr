const mongoose = require('mongoose');
const slug = require('../lib/slug.js');

const DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[0-1])$/;

const createRequiredByDefiniteValidator = function createRequiredByDefiniteValidator(valueOfDefinite, schemaType) {
  return function checkRequiredByDefinite(val) {
    return this.definite === valueOfDefinite ?
      schemaType.prototype.checkRequired.call(this, val) :
      true;
  };
};

const checkRequiredIfDefinite = [createRequiredByDefiniteValidator(true, mongoose.SchemaTypes.String), '{PATH} is requied if `definite` is true.'];
const checkRequiredIfIndefinite = [createRequiredByDefiniteValidator(false, mongoose.SchemaTypes.String), '{PATH} is requied if `definite` is false.'];

const Schedule = new mongoose.Schema({
  title: String, // The human-readable name of the schedule
  slug: { type: String, index: true, default: () => { return slug.generate(); } }, // The slug used in the URL to direct others to this schedule

  definite: Boolean, // Whether the scheduling is for specific dates or just days of the week
  startDay: { type: String, enum: DAYS_OF_THE_WEEK, required: false, validate: checkRequiredIfIndefinite }, // The start day of the schedule (if `definite` is `false`)
  endDay: { type: String, enum: DAYS_OF_THE_WEEK, required: false, validate: checkRequiredIfIndefinite }, // The end day of the schedule (if `definite` is `false`)
  startDate: { type: String, match: DATE_REGEX, required: false, validate: checkRequiredIfDefinite }, // The start day/date of the schedule (if `definite` is `true`)
  endDate: { type: String, match: DATE_REGEX, required: false, validate: checkRequiredIfDefinite }, // The end day/date of the schedule (if `definite` is `true`)

  timezone: String, // Which timezone this schedule is based in
  startTime: { type: Number, min: 0, max: 86400 }, // What time each day scheduling begins (in seconds after midnight)
  endTime: { type: Number, min: 0, max: 86400 }, // What time each day scheduling ends (in seconds after midnight)
});

Schedule.method('normalize', function normalizeSchedule() {
  if (this.definite) {
    this.startDay = undefined;
    this.endDay = undefined;
  } else {
    this.startDate = undefined;
    this.endDate = undefined;
  }
});

module.exports = mongoose.model('Schedule', Schedule);
