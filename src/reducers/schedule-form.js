import Immutable from 'immutable';
import {
  WILL_CREATE_SCHEDULE, DID_CREATE_SCHEDULE,
} from '../actions/schedule.js';
// TODO: import appropriate actions and refactor as appropriate

const INITIAL_STATE = Immutable.fromJS({
  isCreating: false,
  error: null,
  data: {},
});

export const scheduleForm = function scheduleForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
};
