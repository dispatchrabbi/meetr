const mongoose = require('mongoose');
const dbConnect = require('./lib/db-connect.js');

const express = require('express');
const bodyParser = require('body-parser');
const reqLogger = require('./lib/middleware/req-logger.js');
const apiRoutes = require('./api/routes.js');

const CONFIG = require('./config.js');

const logger = require('./logger.js');

logger.debug('Connecting to MongoDB...');
dbConnect.connect(mongoose, CONFIG.db.address, CONFIG.db.name)
  .catch(function complainAboutMongo(err) {
    logger.error({ err }, 'Could not connect to MongoDB.');
  })
  .then(function createServer() {
    const app = express();
    app.use(bodyParser.json()); // automatically parse JSON in the request body
    app.use(reqLogger(logger));

    logger.debug('Adding API routes...');
    /* eslint-disable new-cap */ // express.Router doesn't let you use `new`
    const apiRouter = apiRoutes.decorate(express.Router(), apiRoutes.routes);
    /* eslint-enable new-cap */
    app.use('/api', apiRouter);

    logger.debug('Adding static routes...');
    app.get('/', function _rootGet(req, res) {
      res.status(200).send('Meetr is up!');
    });

    logger.debug('Standing up the server...');
    app.listen(CONFIG.app.port);

    logger.info('Meetr is up and listening on port ' + CONFIG.app.port + '.');
  })
  .catch(function screamAndDie(err) {
    logger.error({ err }, 'An error occurred setting up the server');
  });
