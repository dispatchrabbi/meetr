/*
 * This is Express middleware that makes sure there is a user in the session,
 * for API calls that we want to make sure only happen when someone's logged in to meetr.
 */
module.exports = function checkForUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).send('This endpoint requires you to be logged in.');
  }
};
