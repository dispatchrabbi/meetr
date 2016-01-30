const Schedule = require('../models/schedule.js');
const slug = require('../lib/slug.js');

module.exports = {
  schedulesPost: function schedulesPost(req, res) {
    const requiredFields = ['title', 'definite', 'timezone', 'startDay', 'endDay', 'startTime', 'endTime'];
    const hasRequiredFields = requiredFields.every(function checkForField(fieldName) {
      return fieldName in req.body;
    });

    if (!hasRequiredFields) {
      // TODO: standardize error return formats
      res.status(400).end();
    }

    // TODO: validate definite, timezone, startDay, endDay, startTime, endTime
    // c.f. http://mongoosejs.com/docs/validation.html
    const scheduleData = {
      title: req.body.title,
      slug: slug.generate(),

      definite: req.body.definite,
      timezone: req.body.timezone,

      startDay: req.body.startDay,
      endDay: req.body.endDay,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    };
    Schedule.create(scheduleData)
      .then(function sendCreatedSchedule(createdSchedule) {
        res.status(201).send(createdSchedule);
      },
      /* catch */ function sendError(err) {
        // TODO: send back generic errors and instead log errors somewhere or something
        res.status(500).send(err);
      });
  },

  scheduleGet: function scheduleGet(req, res) {
    const slugToFind = req.params.scheduleSlug;

    Schedule.find({ slug: slugToFind }).exec()
      .then(function sendResults(results) {
        if (results.length > 1) {
          res.status(500).send('More than 1 schedule with slug ' + slugToFind + ' found.');
        } else if (results.length < 1) {
          res.status(404).send('No schedule with slug ' + slugToFind + ' found.');
        } else {
          res.status(200).send(results[0]);
        }
      },
      /* catch */ function sendError(err) {
        res.status(500).send(err);
      });
  },
};
