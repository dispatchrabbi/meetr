import { combineReducers } from 'redux';
import {
  WILL_CREATE_SCHEDULE, DID_CREATE_SCHEDULE,
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

const isCreatingSchedule = function isCreatingSchedule(state = false, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return false;
    case WILL_CREATE_SCHEDULE:
      return true;
    case DID_CREATE_SCHEDULE:
      return false;
    default:
      return state;
  }
};

const scheduleCreationError = function scheduleCreationError(state = null, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return null;
    case DID_CREATE_SCHEDULE:
      return action.error ? action.payload : null;
    case WILL_CREATE_SCHEDULE:
    default:
      return state;
  }
};

const schedule = function schedule(state = null, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return null;
    case DID_CREATE_SCHEDULE:
      return action.error ? null : action.payload;
    case WILL_CREATE_SCHEDULE:
    default:
      return state;
  }
};

const _app = combineReducers({
  schedule,
  scheduleCreationError,
  isCreatingSchedule,
});

export const app = function app(...args) {
  console.log('state:', args);
  return _app(...args);
};
