const bunyan = require('bunyan');
const CONFIG = require('./config.js');

const reqSerializer = function reqSerializer(req) {
  const obj = bunyan.stdSerializers.req(req);
  obj.params = req.params;

  return obj;
};

const logger = bunyan.createLogger({
  name: CONFIG.app.name,
  streams: [
    {
      level: 'debug',
      stream: process.stdout,
    },
  ],
  serializers: {
    err: bunyan.stdSerializers.err,
    req: reqSerializer,
    res: bunyan.stdSerializers.res,
  },
});

module.exports = logger;
