const mongoose = require('mongoose');

const availabilities = ['busy', 'free', 'if-need-be'];

const Participant = new mongoose.Schema({
  name: { type: String, index: true }, // The name of the participant
  hash: { type: String, select: false }, // A password (hashed) for the participant
  schedule: { type: mongoose.SchemaTypes.ObjectId, index: true }, // which schedule this participant belongs to

  availabilities: [{
    day: String, // The day this availability pertains to (either a date or a day of the week)
    time: { type: Number, min: 0, max: 86400 }, // The time this availability pertains to (as the beginning of a 15-minute span, in seconds after midnight)
    availability: { type: String, enume: availabilities }, // Whether the participant is free, if-need-be, or busy
  }],
});

module.exports = mongoose.model('Participant', Participant);
