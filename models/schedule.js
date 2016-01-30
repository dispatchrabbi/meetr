const mongoose = require('mongoose');

const Schedule = new mongoose.Schema({
  title: String, // The human-readable name of the schedule
  slug: String, // The slug used in the URL to direct others to this schedule

  definite: Boolean, // Whether the scheduling is for specific dates or just days of the week
  timezone: String, // Which timezone this schedule is based in

  startDay: String, // The start day/date of the schedule
  endDay: String, // The end day/date of the schedule
  startTime: Number, // What time each day scheduling begins
  endTime: Number, // What time each day scheduling ends
});

module.exports = mongoose.model('Schedule', Schedule);
