const _ = require('lodash');
const APIError = require('./api-error.js');

const ensureApplicationJson = require('../lib/middleware/ensure-application-json.js');
const logRoute = require('../lib/middleware/log-route.js');

const scheduleHelpers = require('./schedule-helpers.js');

const routes = {
  '/schedules': {

    post: function post(req, res) {
      if (!scheduleHelpers.isIncomingDataValid(req.body)) {
        res.status(400).send('Invalid schedule data.');
      }

      scheduleHelpers.create(req.body)
        .then(function sendScheduleBack(createdSchedule) {
          res.status(201).send(createdSchedule);
        })
        .catch(function sendErrorBack(err) {
          req.logger.error({ err });
          res.status(500).send('There was an error creating the schedule.');
        });
    },

  },

  '/schedules/:slug': {

    get: function get(req, res) {
      scheduleHelpers.findBySlug(req.params.slug)
        .then(function sendScheduleBack(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          res.status(200).send(foundSchedule);
        })
        .catch(function sendErrorBack(err) {
          req.logger.error({ err });

          if (err instanceof APIError) {
            res.status(err.httpStatus).send(err.message);
          } else {
            res.status(500).send('There was an error finding the schedule.');
          }
        });
    },

    patch: function patch(req, res) {
      // find the Schedule to modify
      scheduleHelpers.findBySlug(req.params.slug)
        .then(function modifyAndSave(foundSchedule) {
          // could we find the schedule in the first place?
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          // modify the schedule and check that it's valid
          // TODO: This could be made safer by validating/normalizing/screening req.body or using Model validators
          const modifiedSchedule = _.assign(foundSchedule, req.body);
          if (!scheduleHelpers.isIncomingDataValid(modifiedSchedule)) {
            throw new APIError('Invalid schedule data provided.', 400);
          }

          // then save the modified schedule
          return scheduleHelpers.save(modifiedSchedule);
        })
        .then(function sendScheduleBack(savedSchedule) {
          // and finally send it back
          res.status(200).send(savedSchedule);
        })
        .catch(function sendErrorBack(err) {
          req.logger.error({ err });

          if (err instanceof APIError) {
            res.status(err.httpStatus).send(err.message);
          } else {
            res.status(500).send('There was an error patching the schedule.');
          }
        });
    },

    delete: function del(req, res) {
      // Find the Schedule to remove
      scheduleHelpers.findBySlug(req.params.slug)
        .then(function remove(foundSchedule) {
          if (!foundSchedule) {
            throw new APIError('Could not find a schedule with the slug ' + req.params.slug + '.', 404);
          }

          return scheduleHelpers.remove(foundSchedule);
        })
        .then(function sendScheduleBack(removedSchedule) {
          // and finally send it back
          res.status(200).send(removedSchedule);
        })
        .catch(function sendErrorBack(err) {
          req.logger.error({ err });

          if (err instanceof APIError) {
            res.status(err.httpStatus).send(err.message);
          } else {
            res.status(500).send('There was an error deleting the schedule.');
          }
        });
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
