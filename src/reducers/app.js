import { combineReducers } from 'redux-immutablejs';

import { routing } from './routing.js';
import { scheduleForm } from './schedule-form.js';
import { currentSchedule } from './current-schedule.js';
import { currentUser } from './current-user.js';
import { updating } from './updating.js';

export default combineReducers({
  routing,
  scheduleForm,
  currentSchedule,
  currentUser,
  updating,
});
