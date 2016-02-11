// The Mongoose API returns Promises/A+-compliant promises, but they're not actually ES6 promises,
// so I'm wrapping them here so no one gets confused. Except me. Why would you do that, Mongoose?

module.exports = function wrapMpromise(mpromise) {
  return new Promise(function wrap(resolve, reject) {
    mpromise.then(resolve, reject);
  });
};
