export const SET_EDITING_SCHEDULE = 'SET_EDITING_SCHEDULE';
export const setEditingSchedule = function setEditingSchedule(isEditing) {
  return {
    type: SET_EDITING_SCHEDULE,
    payload: isEditing,
  };
};

export const SELECT_AVAILABILITY_TYPE = 'SELECT_AVAILABILITY_TYPE';
export const selectAvailabilityType = function selectAvailabilityType(availabilityType) {
  return {
    type: SELECT_AVAILABILITY_TYPE,
    payload: availabilityType,
  };
};
