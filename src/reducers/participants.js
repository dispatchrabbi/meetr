import _ from 'lodash';

import {
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

import {
  WILL_LOAD_PARTICIPANTS,
  DID_LOAD_PARTICIPANTS,
  WILL_LOG_IN_USER,
  DID_LOG_IN_USER,
  WILL_UPDATE_USER,
  DID_UPDATE_USER,
  LOG_OUT_USER,
} from '../actions/participants.js';

export const isLoadingParticipants = function isLoadingParticipants(state = false, action) {
  switch (action.type) {
    case WILL_LOAD_PARTICIPANTS:
      return true;
    case DID_LOAD_PARTICIPANTS: // fall through
    case UNLOAD_SCHEDULE:
      return false;
    default:
      return state;
  }
};

export const participantsLoadError = function participantsLoadError(state = null, action) {
  switch (action.type) {
    case WILL_LOAD_PARTICIPANTS:
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOAD_PARTICIPANTS:
      return action.error ? action.payload : null;
    default:
      return state;
  }
};

export const participants = function participants(state = null, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOAD_PARTICIPANTS:
      return action.error ? null : action.payload;
    case DID_UPDATE_USER:
      console.log('DID_UPDATE_USER', state, action);
      // If the update didn't result in an error, update the appropriate participant
      if (state && !action.error) {
        return state.map(participant => participant._id === action.payload._id ? action.payload : participant);
      }
      return state;
    default:
      return state;
  }
};

export const isLoggingIn = function isLoggingIn(state = false, action) {
  switch (action.type) {
    case WILL_LOG_IN_USER:
      return true;
    case DID_LOG_IN_USER: // fall through
    case UNLOAD_SCHEDULE:
      return false;
    default:
      return state;
  }
};

export const loginError = function loginError(state = null, action) {
  switch (action.type) {
    case WILL_LOG_IN_USER: // fall through
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOG_IN_USER:
      return action.error ? action.payload : null;
    default:
      return state;
  }
};

export const currentUser = function currentUser(state = null, action) {
  switch (action.type) {
    case LOG_OUT_USER:
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOAD_PARTICIPANTS:
      // Check to make sure the currentUser is in the list of participants that was just loaded (action.payload)
      const currentUserIsInTheList = state === null || action.payload.filter(participant => participant.id === state).length === 0;
      // If so, cool; if not, log them out
      return currentUserIsInTheList ? state : null;
    case DID_LOG_IN_USER:
      // action.payload is the user that was logged in
      return action.error ? null : action.payload._id;
    default:
      return state;
  }
};
