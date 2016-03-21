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
  userParticipant,
} from './participants.js';

import {
  isEditingSchedule,
  availabilityMode,
} from './editing.js';

export default {
  isCreatingSchedule,
  scheduleCreationError,
  isLoadingSchedule,
  scheduleLoadError,
  schedule,
  isEditingSchedule,
  availabilityMode,
  isLoadingParticipants,
  participantsLoadError,
  participants,
  isLoggingIn,
  loginError,
  userParticipant,
};
