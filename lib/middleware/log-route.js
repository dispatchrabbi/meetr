/*
 * This is Express middleware that logs the route and method to the console for debug purposes.
 */
module.exports = function logRoute(req, res, next) {
  req.logger.debug('Hit ' + req.method + ' ' + req.route.path);
  next();
};
