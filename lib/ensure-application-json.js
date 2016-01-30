/*
 * This is Express middleware that ensures that any incoming requests on a route
 * have Content-Type: application/json, so that people don't spend time hunting down
 * why requests with perfectly valid JSON in their request payloads don't get correct behavior.
 *
 * Not that I'm bitter.
 */
module.exports = function ensureApplicationJson(req, res, next) {
  if (req.is('application/json')) {
    next();
  } else {
    res.status(415).send('Please send requests to this endpoint using Content-Type: application/json');
  }
};
