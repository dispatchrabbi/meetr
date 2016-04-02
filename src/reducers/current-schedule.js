import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import {
  WILL_LOAD_SCHEDULE, DID_LOAD_SCHEDULE,
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

import {
  WILL_LOAD_PARTICIPANTS,
  DID_LOAD_PARTICIPANTS,
  DID_UPDATE_USER,
} from '../actions/participants.js';

const INITIAL_STATE_SCHEDULE = Immutable.fromJS({
  isLoading: false,
  error: null,
  obj: null,
});

export const schedule = function schedule(state = INITIAL_STATE_SCHEDULE, action) {
  switch (action) {
    case WILL_LOAD_SCHEDULE:
      return state.set('isLoading', true);
    case DID_LOAD_SCHEDULE:
      return state
        .set('isLoading', false)
        .set('obj', action.error ? null : action.payload)
        .set('error', action.error ? action.payload : null);
    case UNLOAD_SCHEDULE:
      return INITIAL_STATE_SCHEDULE;
    default:
      return state;
  }
};

const INITIAL_STATE_PARTICIPANTS = Immutable.fromJS({
  isLoading: false,
  error: null,
  list: null,
});

export const participants = function participants(state = INITIAL_STATE_PARTICIPANTS, action) {
  switch (action) {
    case DID_LOAD_SCHEDULE:
    case UNLOAD_SCHEDULE:
      return INITIAL_STATE_PARTICIPANTS;
    case WILL_LOAD_PARTICIPANTS:
      return state.set('isLoading', true);
    case DID_LOAD_PARTICIPANTS:
      return state
        .set('isLoading', false)
        .set('list', action.error ? null : action.payload)
        .set('error', action.error ? action.payload : null);
    case DID_UPDATE_USER:
      // If the update didn't result in an error, update the appropriate participant with its new version
      if (!action.error) {
        return state.set('list', state.get('list').map(p => p.get('_id') === action.payload.get('_id') ? action.payload : p));
      }

      return state;
    default:
      return state;
  }
};

export const currentSchedule = combineReducers({
  schedule,
  participants,
});
