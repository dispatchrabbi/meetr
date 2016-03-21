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

export default {
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
