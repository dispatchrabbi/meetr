const _ = require('lodash');
const APIError = require('./api-error.js');
const wrapMpromise = require('../lib/wrap-mpromise.js');

const ensureApplicationJson = require('../lib/middleware/ensure-application-json.js');
const logRoute = require('../lib/middleware/log-route.js');

const Schedule = require('../models/schedule.js');

const mungeValidationErrors = function mungeValidationErrors(err) {
  // err.errors contains the errors (c.f. http://mongoosejs.com/docs/validation.html)
  throw new APIError('Invalid schedule data: ' + _.map(err.errors, 'path').join(', '), 400);
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

const routes = {
  '/schedules': {

    post: function post(req, res) {
      const scheduleToCreate = new Schedule(req.body);
      scheduleToCreate.normalize();
      wrapMpromise(scheduleToCreate.validate())
        .catch(mungeValidationErrors)
        .then(function saveSchedule() {
          return wrapMpromise(scheduleToCreate.save());
        })
        .then(function sendScheduleBack(createdSchedule) {
          res.status(201).send(createdSchedule.getExternalView());
        })
        .catch(genericErrorHandler('There was an error creating the schedule.'));
    },

  },

  '/schedules/:slug': {

    get: function get(req, res) {
      wrapMpromise(Schedule.findOne({ slug: req.params.slug }).exec())
        .then(function sendScheduleBack(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          res.status(200).send(foundSchedule.getExternalView());
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
          res.status(200).send(savedSchedule.getExternalView());
        })
        .catch(genericErrorHandler('There was an error patching the schedule.', req, res));
    },

    delete: function del(req, res) {
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
          res.status(200).send(removedSchedule.getExternalView());
        })
        .catch(genericErrorHandler('There was an error deleting the schedule.', req, res));
    },

  },

  '/schedules/:slug/participants': {

    get: function get(req, res) {
      res.status(501).send('Not yet implemented.');
    },

    post: function post(req, res) {
      res.status(501).send('Not yet implemented.');
    },

  },

  '/schedules/:slug/participants/:pId': {

    get: function get(req, res) {
      res.status(501).send('Not yet implemented.');
    },

    patch: function patch(req, res) {
      res.status(501).send('Not yet implemented.');
    },

    delete: function del(req, res) {
      res.status(501).send('Not yet implemented.');
    },

  },
};

const decorate = function decorate(router, routeConfig) {
  _.each(routeConfig, (methods, route) => {
    // scope to this route
    const scopedRouter = router.route(route);

    _.each(methods, (handler, method) => {
      // start with the actual handler
      const handlers = [handler];

      // then middleware gets applied:
      // Log the route for debug purposes
      handlers.unshift(logRoute);
      // Make sure POST and PATCH requests are application/json
      if (['post', 'patch'].indexOf(method) >= 0) {
        handlers.unshift(ensureApplicationJson);
      }

      // call the appropriate method with the middleware and handler
      scopedRouter[method](...handlers);
    });
  });

  return router;
};

module.exports = {
  routes,
  decorate,
};
