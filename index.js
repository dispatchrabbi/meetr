/* eslint no-console: 0 */
const mongoose = require('mongoose');
const dbConnect = require('./lib/db-connect.js');

const express = require('express');
const bodyParser = require('body-parser');
const ensureApplicationJson = require('./lib/ensure-application-json.js');
const schedulesRoutes = require('./routes/schedules.js');

const CONFIG = require('./config.js');

console.info('Connecting to MongoDB...');
dbConnect.connect(mongoose, CONFIG.db.address, CONFIG.db.name)
  .then(function createServer() {
    const app = express();
    app.use(bodyParser.json()); // automatically parse JSON in the request body

    console.info('Adding routes...');
    app.get('/', function _rootGet(req, res) {
      res.status(200).send('Meetr is up!');
    });

    app.route('/schedules')
      .post(ensureApplicationJson, function _schedulesPost(req, res) {
        console.info('/schedules hit');
        return schedulesRoutes.schedulesPost(req, res);
      });

    app.route('/schedules/:scheduleSlug')
      .get(function _scheduleGet(req, res) {
        console.info('/schedules/' + req.params.scheduleSlug + ' hit');
        return schedulesRoutes.scheduleGet(req, res);
      })
      .patch(ensureApplicationJson, function _schedulePatch(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      })
      .delete(function _scheduleDelete(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      });

    app.route('/schedules/:scheduleSlug/participants')
      .get(function _participantsGet(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      })
      .post(ensureApplicationJson, function _participantsPost(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      });

    app.route('/schedules/:scheduleSlug/participants/:participantId')
      .get(function _participantGet(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      })
      .patch(ensureApplicationJson, function _participantPatch(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      })
      .delete(function _participantDelete(req, res) {
        res.status(501).send(new Error('Not yet implemented.'));
      });

    console.info('Standing up the server...');
    app.listen(CONFIG.app.port);

    console.log('Meetr is up and listening on port ' + CONFIG.app.port + '.');
  })
  .catch(function screamAndDie(err) {
    console.error('Could not connect to MongoDB. Error:');
    console.error(err);
  });
