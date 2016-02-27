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
} from '../actions/participants.js';

const isLoadingParticipants = function isLoadingParticipants(state = false, action) {
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

const participantsLoadError = function participantsLoadError(state = null, action) {
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

const participants = function participants(state = null, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOAD_PARTICIPANTS:
      return action.error ? null : action.payload;
    default:
      return state;
  }
};

const isLoggingIn = function isLoggingIn(state = false, action) {
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

const loginError = function loginError(state = null, action) {
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

const userParticipant = function userParticipant(state = null, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOAD_PARTICIPANTS:
      const userParticipantIsNotInTheList = state === null || action.payload.filter(p => p.id === state.id).length === 0;
      return userParticipantIsNotInTheList ? null : state;
    case DID_LOG_IN_USER:
      return action.error ? null : action.payload;
    default:
      return state;
  }
};

export default {
  isLoadingParticipants,
  participantsLoadError,
  participants,
  isLoggingIn,
  loginError,
  userParticipant,
};
