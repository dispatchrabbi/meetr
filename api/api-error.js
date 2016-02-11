/*
 * This Error subclass is for throwing in endpoint handlers;
 * it captures what HTTP status code we have to send back due to the error that happened.
 *
 * I'd use the new `class` hotness, but there's something with strict mode or something that I'm not gonna chase down.
 * Ah, ES6.
 *
 * @class APIError
 * @param message {String} The message for the Error.
 * @param httpStatus {Number} The HTTP status to return to the client because of this Error.
 */
const APIError = function APIError(message, httpStatus) {
  this.name = 'APIError';
  this.message = message || 'The API encountered an error.';
  this.httpStatus = httpStatus;
  this.stack = (new Error()).stack;
};
APIError.prototype = Object.create(Error);
APIError.constructor = APIError;

module.exports = APIError;
