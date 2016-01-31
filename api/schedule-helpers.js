const wrapMpromise = require('../lib/wrap-mpromise.js');
const slug = require('../lib/slug.js');

const Schedule = require('../models/schedule.js');

/*
 * Retrieve the first Schedule with the given slug, if any exist.
 *
 * @param slugToFind {String} The slug to look up the schedule by.
 * @return {Promise} A promise that resolves to the Schedule with the given slug or null, or rejects with an error.
 */
const findBySlug = function findBySlug(slugToFind) {
  return wrapMpromise(Schedule.findOne({ slug: slugToFind }).exec());
};

/*
 * Create a new Schedule with the given data, assuming it's valid.
 *
 * TODO: Detail schedule value requirements
 * @param scheduleData {Object} The data to use to create the new Schedule.
 * @return {Promise} A promise that will resolve with the new Schedule or reject with an error.
 */
const create = function create(params) {
  const scheduleData = {
    title: params.title,
    slug: slug.generate(),

    definite: params.definite,
    timezone: params.timezone,

    startDay: params.startDay,
    endDay: params.endDay,
    startTime: params.startTime,
    endTime: params.endTime,
  };

  return wrapMpromise(Schedule.create(scheduleData));
};

/*
 * Save a Schedule to the database.
 *
 * @param schedule {Schedule} The schedule to save.
 * @return {Promise} A promise that resolves to the saved schedule, or rejects if there's an error.
 */
const save = function save(schedule) {
  return wrapMpromise(schedule.save());
};

/*
 * Remove a Schedule from the database.
 *
 * @param schedule {Schedule} The schedule to remove.
 * @return {Promise} A promise that resolves if removal was successful, or rejects if there's an error.
 */
const remove = function remove(schedule) {
  return wrapMpromise(schedule.remove());
};

/*
 * Check to make sure schedule data is valid.
 *
 * // TODO: Up our validation error message game
 * // TODO: Detail what data should go in scheduleData
 * @param scheduleData {Object} The data to check
 * @return {Boolean} Whether the data is valid
 */
const isIncomingDataValid = function isIncomingDataValid(scheduleData) {
  // Do we have all the fields we require?
  const requiredFields = ['title', 'definite', 'timezone', 'startDay', 'endDay', 'startTime', 'endTime'];
  const missingFields = requiredFields.filter((fieldName) => { return !(fieldName in scheduleData); });
  if (missingFields.length > 0) {
    return false;
  }

  // Are all the fields' values what we expect?
  // TODO: check field values, probably with a validation library or http://mongoosejs.com/docs/validation.html
  return true;
};

module.exports = {
  findBySlug,
  create,
  save,
  remove,
  isIncomingDataValid,
};
