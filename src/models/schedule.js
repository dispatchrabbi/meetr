import handlers from './handlers.js';

import CONFIG from '../config.js';

const getAll = function getAll() {
  const URL = CONFIG.apiPath + '/schedules';

  // Pass along any error
  return fetch(URL)
    .then(handlers.throwResultIfNot2XX)
    .catch(handlers.throwGenericError);
};

const getBySlug = function getBySlug(slug) {
  const URL = CONFIG.apiPath + '/schedules/' + slug;

  // Pass along any error
  return fetch(URL)
    .then(handlers.throwResultIfNot2XX)
    .catch(handlers.throwGenericError);
};

const create = function create(scheduleData) {
  // TODO: validation for `scheduleData`

  const URL = CONFIG.apiPath + '/schedules';
  const OPTIONS = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scheduleData),
  };

  return fetch(URL, OPTIONS)
    .then(handlers.throwResultIfNot2XX)
    .catch(handlers.throwGenericError);
};

export default {
  getAll,
  getBySlug,
  create,
};
