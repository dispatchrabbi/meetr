export const WILL_CREATE_SCHEDULE = 'WILL_CREATE_SCHEDULE';
export const DID_CREATE_SCHEDULE = 'DID_CREATE_SCHEDULE';

// FIXME: 1 move this to a model or something. It doesn't belong here
// FIXME: Error handling from the server is atrocious too
const _makeCreateScheduleRequest = function _makeCreateScheduleRequest(scheduleData) {
  return fetch('/api/schedules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scheduleData),
  }).then(res => res.json());
};

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
    return _makeCreateScheduleRequest(scheduleData)
      .then(
        schedule => dispatch(didCreateSchedule(schedule)),
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
