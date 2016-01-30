const mongoose = require('mongoose');

const Participant = new mongoose.Schema({
  name: String, // The name of the participant
  hash: String, // A password (hashed) for the participant
  schedule: mongoose.Schema.Types.ObjectId, // which schedule this participant belongs to

  availabilities: [{
    day: String, // The day this availability pertains to (either a date or a day of the week)
    time: Number, // The time this availability pertains to (as the beginning of a 15-minute span)
    availability: String, // Whether the participant is free, if-need-be, or busy
  }],
});

module.exports = mongoose.model('Participant', Participant);
