const mongoose = require('mongoose');
const dbConnect = require('./lib/db-connect.js');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const reqLogger = require('./lib/middleware/req-logger.js');
const apiRoutes = require('./api/routes.js');
const addDevServer = require('./lib/middleware/add-dev-server.js');

const CONFIG = require('./config.js');

const logger = require('./logger.js');

logger.debug('Connecting to MongoDB...');
dbConnect.connect(mongoose, CONFIG.db.address, CONFIG.db.name)
  .catch(function complainAboutMongo(err) {
    logger.error({ err }, 'Could not connect to MongoDB.');
  })
  .then(function createServer(dbConnection) {
    const app = express();

    logger.debug('Installing middleware...');
    // Parse the request body as JSON (if possible)
    app.use(bodyParser.json());
    // Create or retrieve a session for this request
    app.use(session({
      name: CONFIG.app.name + '.sid',
      secret: CONFIG.session.secret,
      store: new MongoStore({ mongooseConnection: dbConnection }),
      cookie: { secure: 'auto' }, // secure cookies when accessed by HTTPS; non-secure cookies when accessed by HTTP
      resave: false, // don't save the session if we didn't modify it at all
      saveUninitialized: false, // don't save a new session unless we modified it somehow
      // unset: 'destroy', // remove the session from the store if req.session is deleted/set to null
    }));
    // Log data about the request
    app.use(reqLogger(logger));

    logger.debug('Adding API routes...');
    /* eslint-disable new-cap */ // express.Router doesn't let you use `new`
    const apiRouter = apiRoutes.addAPIRoutes(express.Router());
    /* eslint-enable new-cap */
    app.use('/api', apiRouter);

    logger.debug('Adding static routes...');
    if (!CONFIG.development) {
      app.get('*', function serveFrontEnd(req, res) {
        res.status(200).send('Meetr is up!');
      });
    } else {
      addDevServer(app);
    }

    logger.debug('Standing up the server...');
    app.listen(CONFIG.app.port);

    logger.info('Meetr is up and listening on port ' + CONFIG.app.port + '.');
  })
  .catch(function screamAndDie(err) {
    logger.error({ err }, 'An error occurred setting up the server');
  });
