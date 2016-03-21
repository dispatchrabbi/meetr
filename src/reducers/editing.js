import {
  SET_EDITING_SCHEDULE,
  SET_AVAILABILITY_MODE,
} from '../actions/editing.js';
import { UNLOAD_SCHEDULE } from '../actions/schedule.js';

export const isEditingSchedule = function isEditingSchedule(state = false, action) {
  switch (action.type) {
    case SET_EDITING_SCHEDULE:
      return action.payload;
    case UNLOAD_SCHEDULE:
      return false;
    default:
      return state;
  }
};

export const availabilityMode = function availabilityMode(state = 'free', action) {
  switch (action.type) {
    case SET_AVAILABILITY_MODE:
      return action.payload;
    case UNLOAD_SCHEDULE:
      return 'free';
    default:
      return state;
  }
};
