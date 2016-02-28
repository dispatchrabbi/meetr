import {
  WILL_CREATE_SCHEDULE, DID_CREATE_SCHEDULE,
  WILL_LOAD_SCHEDULE, DID_LOAD_SCHEDULE,
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

export const isCreatingSchedule = function isCreatingSchedule(state = false, action) {
  switch (action.type) {
    case WILL_CREATE_SCHEDULE:
      return true;
    case DID_CREATE_SCHEDULE:
    case UNLOAD_SCHEDULE:
      return false;
    default:
      return state;
  }
};

export const scheduleCreationError = function scheduleCreationError(state = null, action) {
  switch (action.type) {
    case WILL_CREATE_SCHEDULE: // fall through
    case UNLOAD_SCHEDULE:
      return null;
    case DID_CREATE_SCHEDULE:
      return action.error ? action.payload : null;
    default:
      return state;
  }
};

export const isLoadingSchedule = function isLoadingSchedule(state = false, action) {
  switch (action.type) {
    case WILL_LOAD_SCHEDULE:
      return true;
    case DID_LOAD_SCHEDULE: // fall through
    case UNLOAD_SCHEDULE:
      return false;
    default:
      return state;
  }
};

export const scheduleLoadError = function scheduleLoadError(state = null, action) {
  switch (action.type) {
    case WILL_LOAD_SCHEDULE: // fall through
    case UNLOAD_SCHEDULE:
      return null;
    case DID_LOAD_SCHEDULE:
      return action.error ? action.payload : null;
    default:
      return state;
  }
};

export const schedule = function schedule(state = null, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
      return null;
    case DID_CREATE_SCHEDULE:
    case DID_LOAD_SCHEDULE:
      return action.error ? null : action.payload;
    default:
      return state;
  }
};
