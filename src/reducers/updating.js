import Immutable from 'immutable';

import {
  SET_EDITING_SCHEDULE,
  SELECT_AVAILABILITY_TYPE,
} from '../actions/editing.js';

import {
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

import {
  WILL_UPDATE_USER,
  DID_UPDATE_USER,
  DID_LOG_IN_USER,
  LOG_OUT_USER,
} from '../actions/participants.js';

const INITIAL_STATE = Immutable.fromJS({
  isEditing: false,
  selectedAvailabiltyType: 'free',
  isUpdating: false,
  error: null,
});

export const updating = function updating(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNLOAD_SCHEDULE:
    case DID_LOG_IN_USER:
    case LOG_OUT_USER:
      return INITIAL_STATE;
    case SET_EDITING_SCHEDULE:
      return state.set('isEditing', action.payload);
    case SELECT_AVAILABILITY_TYPE:
      return state.set('selectedAvailabiltyType', action.payload);
    case WILL_UPDATE_USER:
      return state.set('isUpdating', true);
    case DID_UPDATE_USER:
      return state
        .set('isUpdating', false)
        .set('error', action.error ? action.payload : action.error);
    default:
      return state;
  }
};
