import {
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

import {
  DID_LOAD_PARTICIPANTS,
  DID_LOG_IN_USER,
  LOG_OUT_USER,
} from '../actions/participants.js';

const INITIAL_STATE = null;

export const currentUser = function currentUser(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
    case LOG_OUT_USER:
      return INITIAL_STATE;
    case DID_LOAD_PARTICIPANTS:
      // If the load resulted in an error, log the user out.
      if (action.error) {
        return INITIAL_STATE;
      }

      // If the current user wasn't in the participants that were loaded, log them out.
      const currentUserWasLoaded = action.payload.some(p => p.get('_id') === state);
      if (!currentUserWasLoaded) {
        return INITIAL_STATE;
      }

      return state;
    case DID_LOG_IN_USER:
      return action.error ? null : action.payload.get('_id');
    default:
      return state;
  }
};
