import Immutable from 'immutable';

import {
  UNLOAD_SCHEDULE,
} from '../actions/schedule.js';

import {
  WILL_LOG_IN_USER,
  DID_LOG_IN_USER,
  LOG_OUT_USER,
} from '../actions/participants.js';

import {
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM,
  UPDATE_LOGIN_FORM,
} from '../actions/login-form.js';

const INITIAL_STATE = Immutable.fromJS({
  isVisible: false,

  name: '',
  password: '',

  isLoggingIn: false,
  error: null,
});

export const loginForm = function loginForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_LOGIN_FORM:
      return state.set('isVisible', true);
    case HIDE_LOGIN_FORM:
      return state.set('isVisible', false);
    case UPDATE_LOGIN_FORM:
      return state
        .set(action.payload.field, action.payload.newValue);
    case WILL_LOG_IN_USER:
      return state.set('isLoggingIn', true);
    case DID_LOG_IN_USER:
      return INITIAL_STATE
        .set('error', action.error ? action.payload : null);
    case UNLOAD_SCHEDULE:
    case LOG_OUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
