import handlers from './handlers.js';

import CONFIG from '../config.js';

const getAll = function getAll(slug) {
  const URL = CONFIG.apiPath + '/schedules/' + slug + '/participants';

  return fetch(URL)
    .then(handlers.throwResultIfNot2XX)
    .catch(handlers.throwGenericError);
};

const logIn = function logIn(slug, name, password) {
  const URL = CONFIG.apiPath + '/schedules/' + slug + '/participants';
  const OPTIONS = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  };

  return fetch(URL, OPTIONS)
    .then(handlers.throwResultIfNot2XX) // TODO: add a 'created' flag
    .catch(handlers.throwGenericError);
};

const saveAvailability = function saveAvailability(slug, userParticipant, availability) {
  const URL = CONFIG.apiPath + '/schedules/' + slug + '/participants/' + userParticipant.id;
  const OPTIONS = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ availability }),
  };

  return fetch(URL, OPTIONS)
    .then(handlers.throwResultIfNot2XX)
    .catch(handlers.throwGenericError);
};

export default {
  getAll,
  logIn,
  saveAvailability,
};
