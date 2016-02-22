import CONFIG from '../config.js';

const _throwResultIfNot2XX = function _throwResultIfNot2XX(result) {
  if (!result.ok) {
    throw result;
  } else {
    return result.json();
  }
};

const _throwGenericError = function _throwGenericError(result) {
  const errorMessage = `Request error: ${result.status} ${JSON.stringify(result.json())}`;
  throw new Error(errorMessage);
};

const getAll = function getAll() {
  const URL = CONFIG.apiPath + '/schedules';

  // Pass along any error
  return fetch(URL)
    .then(_throwResultIfNot2XX)
    .catch(_throwGenericError);
};

const getBySlug = function getBySlug(slug) {
  const URL = CONFIG.apiPath + '/schedules/' + slug;

  // Pass along any error
  return fetch(URL)
    .then(_throwResultIfNot2XX)
    .catch(_throwGenericError);
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
    .then(_throwResultIfNot2XX)
    .catch(_throwGenericError);
};

export default {
  getAll,
  getBySlug,
  create,
};
