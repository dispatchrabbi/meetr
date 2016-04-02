import { combineReducers } from 'redux-immutablejs';

import { routing } from './routing.js';

import { currentSchedule } from './current-schedule.js';
import { currentUser } from './current-user.js';
import { updating } from './updating.js';

import { scheduleForm } from './schedule-form.js';
import { loginForm } from './login-form.js';

export default combineReducers({
  routing,

  currentSchedule,
  currentUser,
  updating,

  scheduleForm,
  loginForm,
});
