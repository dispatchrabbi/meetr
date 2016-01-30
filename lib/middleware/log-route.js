/* eslint no-console: 0 */
/*
 * This is Express middleware that logs the route and method to the console for debug purposes.
 * TODO: Change this to use whatever debug library I end up using.
 */
module.exports = function logRoute(req, res, next) {
  console.info('Hit ' + req.method + ' ' + req.route.path + ' with params ' + JSON.stringify(req.params));
  next();
};
