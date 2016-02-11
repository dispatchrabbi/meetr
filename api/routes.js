const _ = require('lodash');
const APIError = require('./api-error.js');
const wrapMpromise = require('../lib/wrap-mpromise.js');

const ensureApplicationJson = require('../lib/middleware/ensure-application-json.js');
const logRoute = require('../lib/middleware/log-route.js');

const Schedule = require('../models/schedule.js');
const Participant = require('../models/participant.js');

const mungeValidationErrors = function mungeValidationErrors(err) {
  // err.errors contains the errors (c.f. http://mongoosejs.com/docs/validation.html)
  throw new APIError('Invalid data: ' + _.map(err.errors, 'path').join(', '), 400);
};

const genericErrorHandler = function genericErrorHandler(defaultErrorMessage, req, res) {
  return function sendErrorBack(err) {
    req.logger.error({ err });

    if (err instanceof APIError) {
      res.status(err.httpStatus).send(err.message);
    } else {
      res.status(500).send(defaultErrorMessage);
    }
  };
};

const handlers = {
  schedule: {
    create: function create(req, res) {
      const scheduleToCreate = new Schedule(req.body);
      scheduleToCreate.normalize();
      wrapMpromise(scheduleToCreate.validate())
        .catch(mungeValidationErrors)
        .then(function saveSchedule() {
          return wrapMpromise(scheduleToCreate.save());
        })
        .then(function sendScheduleBack(createdSchedule) {
          res.status(201).send(createdSchedule);
        })
        .catch(genericErrorHandler('There was an error creating the schedule.'));
    },
    getBySlug: function getBySlug(req, res) {
      wrapMpromise(Schedule.findOne({ slug: req.params.slug }).exec())
        .then(function sendScheduleBack(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          res.status(200).send(foundSchedule);
        })
        .catch(genericErrorHandler('There was an error finding the schedule.', req, res));
    },
    patch: function patch(req, res) {
      // find the Schedule to modify
      wrapMpromise(Schedule.findOne({ slug: req.params.slug }).exec())
        .then(function modifyAndValidate(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          const modifiedSchedule = _.assign(foundSchedule, req.body);
          modifiedSchedule.normalize();
          // validate() doesn't return the schedule, so we need to do that in a quick then here
          // we'll also take the opportunity to munge any validation errors.
          return wrapMpromise(modifiedSchedule.validate())
            .then(() => modifiedSchedule, mungeValidationErrors);
        })
        .then(function saveSchedule(validSchedule) {
          return wrapMpromise(validSchedule.save());
        })
        .then(function sendScheduleBack(savedSchedule) {
          // and finally send it back
          res.status(200).send(savedSchedule);
        })
        .catch(genericErrorHandler('There was an error patching the schedule.', req, res));
    },
    delete: function _delete(req, res) {
      // Find the Schedule to remove
      wrapMpromise(Schedule.findOne({ slug: req.params.slug }).exec())
        .then(function removeSchedule(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          return wrapMpromise(foundSchedule.remove());
        })
        .then(function sendScheduleBack(removedSchedule) {
          // and finally send it back
          res.status(200).send(removedSchedule);
        })
        .catch(genericErrorHandler('There was an error deleting the schedule.', req, res));
    },
  },
  participant: {
    getAllForSchedule: function getAllForSchedule(req, res) {
      wrapMpromise(Schedule.findOne({ slug: req.params.slug }).exec())
        .then(function findParticipants(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug);
          }

          return wrapMpromise(Participant.find({ schedule: foundSchedule._id }).exec());
        })
        .then(function sendParticipantsBack(foundParticipants) {
          res.status(200).send(foundParticipants.map(p => p.sanitize()));
        })
        .catch(genericErrorHandler('There was an error finding the participants.', req, res));
    },
    registerOrVerify: function registerOrVerify(req, res) {
      /* eslint-disable no-var */ // We need to use a closure here, and Node doesn't like us using `let`.
      var participantSchedule;
      var created = false;
      /* eslint-enable no-var */

      wrapMpromise(Schedule.findOne({ slug: req.params.slug }).exec())
        .then(function createParticipant(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug);
          }
          participantSchedule = foundSchedule;

          // So we need to check if there is a Participant with the name we were given.
          // If there isn't one, we need to register it as a new participant with the password given.
          // If there is one, we need to verify the password.
          // Either way we need to send that Participant back (unless there's an error of some kind)
          if (!req.body.name) {
            throw new APIError('No name provided.', 400);
          }
          if (req.body.password === undefined) {
            throw new APIError('No password provided.', 400);
          }

          return wrapMpromise(Participant.findOne({ name: req.body.name }).exec());
        })
        .then(function verifyOrRegisterParticipant(foundParticipant) {
          if (!foundParticipant) {
            created = true;
            return Participant.register(req.body.name, req.body.password, participantSchedule);
          }

          return foundParticipant.verify(req.body.password)
            .then(function checkVerification(verified) {
              if (!verified) {
                throw new APIError('Authentication failed.', 403);
              }

              return foundParticipant;
            });
        })
        .then(function sendParticipantBack(registeredOrVerifiedParticipant) {
          res.status(created ? 201 : 200).send(registeredOrVerifiedParticipant.sanitize());
        })
        .catch(genericErrorHandler('There was an error registering the participant.', req, res));
    },
    getById: function getById(req, res) {
      res.status(501).send('Not yet implemented.');
    },
    patch: function patch(req, res) {
      res.status(501).send('Not yet implemented.');
    },
    delete: function _delete(req, res) {
      res.status(501).send('Not yet implemented.');
    },
  },
};

const addAPIRoutes = function addAPIRoutes(router) {
  router.use(logRoute);

  router.route('/schedules')
    .post(ensureApplicationJson, handlers.schedule.create);

  router.route('/schedules/:slug')
    .get(handlers.schedule.getBySlug)
    .patch(ensureApplicationJson, handlers.schedule.patch)
    .delete(ensureApplicationJson, handlers.schedule.delete);

  router.route('/schedules/:slug/participants')
    .get(handlers.participant.getAllForSchedule)
    .post(ensureApplicationJson, handlers.participant.registerOrVerify);

  router.route('/participants/:participantId')
    .get(handlers.participant.getById)
    .patch(ensureApplicationJson, handlers.participant.patch)
    .delete(ensureApplicationJson, handlers.participant.delete);

  return router;
};

module.exports = {
  addAPIRoutes,
};
