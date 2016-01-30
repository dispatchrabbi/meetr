/* eslint no-console: 0 */
const mongoose = require('mongoose');
const dbConnect = require('./lib/db-connect.js');

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/routes.js');

const CONFIG = require('./config.js');

console.info('Connecting to MongoDB...');
dbConnect.connect(mongoose, CONFIG.db.address, CONFIG.db.name)
  .then(function createServer() {
    const app = express();
    app.use(bodyParser.json()); // automatically parse JSON in the request body

    console.info('Adding API routes...');
    /* eslint-disable new-cap */ // express.Router doesn't let you use `new`
    const apiRouter = apiRoutes.decorate(express.Router(), apiRoutes.routes);
    /* eslint-enable new-cap */
    app.use('/api', apiRouter);

    console.info('Adding static routes...');
    app.get('/', function _rootGet(req, res) {
      res.status(200).send('Meetr is up!');
    });

    console.info('Standing up the server...');
    app.listen(CONFIG.app.port);

    console.log('Meetr is up and listening on port ' + CONFIG.app.port + '.');
  })
  .catch(function screamAndDie(err) {
    console.error('Could not connect to MongoDB. Error:');
    console.error(err);
  });
