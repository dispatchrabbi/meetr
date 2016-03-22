import Immutable from 'immutable';
import participants from '../models/participants.js';

// willLoadParticipants
export const WILL_LOAD_PARTICIPANTS = 'WILL_LOAD_PARTICIPANTS';
export const willLoadParticipants = function willLoadParticipants(scheduleSlug) {
  return {
    type: WILL_LOAD_PARTICIPANTS,
    payload: scheduleSlug,
  };
};

// didLoadParticipants
export const DID_LOAD_PARTICIPANTS = 'DID_LOAD_PARTICIPANTS';
export const didLoadParticipants = function didLoadParticipants(loadedParticipantsOrError) {
  return {
    type: DID_LOAD_PARTICIPANTS,
    payload: Immutable.fromJS(loadedParticipantsOrError),
    error: loadedParticipantsOrError instanceof Error,
  };
};

// loadParticipants
export const loadParticipants = function loadParticipants(scheduleSlug) {
  return function loadParticipantsThunk(dispatch) {
    // Let folks know we're about to load some participants up in here
    dispatch(willLoadParticipants(scheduleSlug));

    // Make sure we return a promise so others can play off the request being done too
    return participants.getAll(scheduleSlug)
      .then(function dispatchDidLoadParticipants(loadedParticipants) {
        dispatch(didLoadParticipants(loadedParticipants));
        return loadedParticipants;
      })
      .catch(function dispatchDidLoadParticipantsWithError(err) {
        dispatch(didLoadParticipants(err));
        throw err;
      });
  };
};

// willLogInUser
export const WILL_LOG_IN_USER = 'WILL_LOG_IN_USER';
export const willLogInUser = function willLogInUser(name) {
  return {
    type: WILL_LOG_IN_USER,
    payload: name,
  };
};

// didLogInUser
export const DID_LOG_IN_USER = 'DID_LOG_IN_USER';
export const didLogInUser = function didLogInUser(loggedInUserOrError) {
  return {
    type: DID_LOG_IN_USER,
    payload: Immutable.fromJS(loggedInUserOrError),
    error: loggedInUserOrError instanceof Error,
  };
};

// logInUser
export const logInUser = function logInUser(scheduleSlug, name, password) {
  return function logInUserThunk(dispatch) {
    // Let folks know we're about to log someone in
    dispatch(willLogInUser(name));

    // Make sure we return a promise so others can play off the request being done too
    return participants.logIn(scheduleSlug, name, password)
      .then(function dispatchDidLogInUser(loggedInUser) {
        dispatch(didLogInUser(loggedInUser));
        return loggedInUser;
      })
      .catch(function dispatchDidLogInUserWithError(err) {
        dispatch(didLogInUser(err));
        throw err;
      });
  };
};

// willUpdateUser
export const WILL_UPDATE_USER = 'WILL_UPDATE_USER';
export const willUpdateUser = function willUpdateUser(updatedData) {
  return {
    type: WILL_UPDATE_USER,
    payload: updatedData,
  };
};

// didUpdateUser
export const DID_UPDATE_USER = 'DID_UPDATE_USER';
export const didUpdateUser = function didUpdateUser(updatedUserOrError) {
  return {
    type: DID_UPDATE_USER,
    payload: Immutable.fromJS(updatedUserOrError),
    error: updatedUserOrError instanceof Error,
  };
};

// updateUser
export const updateUser = function updateUser(userId, updatedAvailabilities) {
  return function updateUserThunk(dispatch) {
    // Let folks know we're about to update that sweet availability
    dispatch(willUpdateUser(name));

    // Make sure we return a promise so others can play off the request being done too
    return participants.saveAvailability(userId, updatedAvailabilities)
      .then(function dispatchDidUpdateUser(updatedUser) {
        dispatch(didUpdateUser(updatedUser));
        return updatedUser;
      })
      .catch(function dispatchDidUpdateUserWithError(err) {
        dispatch(didUpdateUser(err));
        throw err;
      });
  };
};

// TODO: Make this actually talk to the server instead of just being front-end
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const logOutUser = function logOutUser() {
  return {
    type: LOG_OUT_USER,
  };
};
