const mongoose = require('mongoose');
const wrapMpromise = require('../lib/wrap-mpromise.js');
const hash = require('../lib/hash.js');

const AVAILABILITIES = ['busy', 'free', 'if-need-be'];

const Participant = new mongoose.Schema({
  name: { type: String, index: true }, // The name of the participant
  hash: { type: String }, // A password (hashed) for the participant
  schedule: { type: mongoose.SchemaTypes.ObjectId, index: true }, // which schedule this participant belongs to

  availabilities: [{
    day: String, // The day this availability pertains to (either a date or a day of the week)
    time: { type: Number, min: 0, max: 86400 }, // The time this availability pertains to (as the beginning of a 15-minute span, in seconds after midnight)
    availability: { type: String, enum: AVAILABILITIES }, // Whether the participant is free, if-need-be, or busy
  }],
});

/* eslint-disable no-var */
var ParticipantModel; // We need access to the Model inside `register` and Node doesn't like top-scoped let.
/* eslint-enable no-var */
Participant.static('register', function register(name, password, schedule) {
  return hash.create(password)
    .then(function saveParticipant(hashedPassword) {
      const participantToRegister = new ParticipantModel({
        name,
        hash: hashedPassword,
        schedule,

        availabilities: [],
      });

      return wrapMpromise(participantToRegister.save());
    });
});

Participant.method('verify', function verify(password) {
  return hash.verify(password, this.hash);
});

Participant.method('sanitize', function sanitize() {
  return {
    name: this.name,
    availabilities: this.availabilities,
  };
});

ParticipantModel = mongoose.model('Participant', Participant);
module.exports = ParticipantModel;
