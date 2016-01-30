const _ = require('lodash');

const ensureApplicationJson = require('../lib/middleware/ensure-application-json.js');
const logRoute = require('../lib/middleware/log-route.js');

const schedules = require('./schedules.js');

const routes = {
  '/schedules': {
    post: function post(req, res) {
      if (!schedules.isIncomingDataValid(req.body)) {
        res.status(400).send('Invalid schedule data.');
      }

      schedules.create(req.body)
        .then(function sendScheduleBack(createdSchedule) {
          res.status(201).send(createdSchedule);
        })
        .catch(function sendErrorBack(err) {
          console.error(err);
          res.status(500).send('There was an error creating the schedule.');
        });
    },
  },
  '/schedules/:slug': {
    get: function get(req, res) {
      schedules.findBySlug(req.params.slug)
        .then(function sendScheduleBack(foundSchedule) {
          if (foundSchedule) {
            res.status(200).send(foundSchedule);
          } else {
            res.status(404).send('Could not find a schedule with the slug ' + req.params.slug + '.');
          }
        })
        .catch(function sendErrorBack(err) {
          console.error(err);
          res.status(500).send('There was an error finding the schedule.');
        });
    },
    patch: function patch(req, res) {
      res.status(501).send('Not yet implemented.');
    },
    delete: function del(req, res) {
      res.status(501).send('Not yet implemented.');
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
