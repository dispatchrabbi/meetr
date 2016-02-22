import schedule from '../models/schedule.js';

export const WILL_CREATE_SCHEDULE = 'WILL_CREATE_SCHEDULE';
export const DID_CREATE_SCHEDULE = 'DID_CREATE_SCHEDULE';

const willCreateSchedule = function willCreateSchedule(scheduleData) {
  return {
    type: WILL_CREATE_SCHEDULE,
    payload: scheduleData,
  };
};

const didCreateSchedule = function didCreateSchedule(createdScheduleOrError) {
  return {
    type: DID_CREATE_SCHEDULE,
    payload: createdScheduleOrError,
    error: createdScheduleOrError instanceof Error,
  };
};

export const createSchedule = function createSchedule(title, definite, startDay, endDay, startDate, endDate, startTime, endTime, timezone) {
  const scheduleData = Object.assign({
    title,
    definite,
    timezone,
    startTime,
    endTime,
  }, definite ? { startDate, endDate } : { startTime, endTime });

  // Return a thunk for the thunk middleware
  return function createScheduleThunk(dispatch) {
    dispatch(willCreateSchedule(scheduleData));
    return schedule.create(scheduleData)
      .then(
        createdSchedule => dispatch(didCreateSchedule(createdSchedule)),
        err => dispatch(didCreateSchedule(err))
      ); // The same action is dispatched whether there was an error or not
  };
};

export const UNLOAD_SCHEDULE = 'UNLOAD_SCHEDULE';

export const unloadSchedule = function unloadSchedule() {
  return {
    type: UNLOAD_SCHEDULE,
  };
};
