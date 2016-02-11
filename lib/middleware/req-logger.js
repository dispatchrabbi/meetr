/*
 * This is Express middleware that adds a bunyan logger to each request
 * so we can log inside of request handling.
 *
 * The logger will be available as req.logger.
 */
module.exports = function createRequestLogger(parentLogger) {
  return function reqLoggerMiddleware(req, res, next) {
    req.logger = parentLogger.child({
      reqId: 'req-' + Date.now(),
      req,
    });

    next();
  };
};
