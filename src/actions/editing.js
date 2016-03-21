export const SET_EDITING_SCHEDULE = 'SET_EDITING_SCHEDULE';
export const setEditingSchedule = function setEditingSchedule(isEditing) {
  return {
    type: SET_EDITING_SCHEDULE,
    payload: isEditing,
  };
};

export const SET_AVAILABILITY_MODE = 'SET_AVAILABILITY_MODE';
export const setAvailability = function setAvailability(availabilityMode) {
  return {
    type: SET_AVAILABILITY_MODE,
    payload: availabilityMode,
  };
};
