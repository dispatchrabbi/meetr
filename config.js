const PACKAGE = require('./package.json');

module.exports = {
  debug: !!process.env.DEBUG,
  development: !!process.env.DEVELOPMENT,
  app: {
    name: PACKAGE.name,
    version: PACKAGE.version,
    port: process.env.PORT || 8080,
  },
  db: {
    address: process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT,
    name: process.env.DB_NAME || 'meetr',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'meetr is awesome',
  },
};
