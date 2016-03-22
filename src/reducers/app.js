import {
  routing,
} from './routing.js';

import {
  isCreatingSchedule,
  scheduleCreationError,
  isLoadingSchedule,
  scheduleLoadError,
  schedule,
} from './schedule.js';

import {
  isLoadingParticipants,
  participantsLoadError,
  participants,
  isLoggingIn,
  loginError,
  currentUser,
} from './participants.js';

import {
  isEditingSchedule,
  availabilityMode,
} from './editing.js';

// TODO: rewrite the reducers to affect the state as a whole based on action, rather than each portion of the state
// (or maybe split up the state into smaller portions, but don't do every property inidividually?)
export default {
  routing,

  schedule,
  isCreatingSchedule,
  scheduleCreationError,
  isLoadingSchedule,
  scheduleLoadError,

  participants,
  isLoadingParticipants,
  participantsLoadError,

  currentUser,
  isLoggingIn,
  loginError,

  isEditingSchedule,
  availabilityMode,
};
