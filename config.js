const PACKAGE = require('./package.json');

module.exports = {
  // TODO: this ought to go away and be replaced with NODE_ENV (development/production)
  debug: !!process.env.DEBUG,
  development: !!process.env.DEVELOPMENT,
  app: {
    name: PACKAGE.name,
    version: PACKAGE.version,
    port: process.env.APP_PORT || 8080,
  },
  db: {
    address: process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT,
    name: process.env.DB_NAME || PACKAGE.name,
  },
  session: {
    secret: process.env.SESSION_SECRET || 'meetr is awesome',
  },
};
