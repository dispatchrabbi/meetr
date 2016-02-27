import schedule from '../models/schedule.js';

// willCreateSchedule
export const WILL_CREATE_SCHEDULE = 'WILL_CREATE_SCHEDULE';
export const willCreateSchedule = function willCreateSchedule(scheduleData) {
  return {
    type: WILL_CREATE_SCHEDULE,
    payload: scheduleData,
  };
};

// didCreateSchedule
export const DID_CREATE_SCHEDULE = 'DID_CREATE_SCHEDULE';
export const didCreateSchedule = function didCreateSchedule(createdScheduleOrError) {
  return {
    type: DID_CREATE_SCHEDULE,
    payload: createdScheduleOrError,
    error: createdScheduleOrError instanceof Error,
  };
};

// createSchedule
export const createSchedule = function createSchedule(title, definite, startDay, endDay, startDate, endDate, startTime, endTime, timezone) {
  const scheduleData = Object.assign({
    title,
    definite,
    timezone,
    startTime,
    endTime,
  }, definite ? { startDate, endDate } : { startTime, endTime });

  // We need to do some async stuff, so we'll use a thunk and return the promise (for others to use)
  return function createScheduleThunk(dispatch) {
    // Say we're about to create a schedule (so that spinners and whatnot can be activated)
    dispatch(willCreateSchedule(scheduleData));

    // Now, actually create the schedule!
    return schedule.create(scheduleData)
      // The same action is dispatched whether there was an error or not.
      .then(function dispatchDidCreateSchedule(createdSchedule) {
        // We're good! Let's let everyone know it got created.
        dispatch(didCreateSchedule(createdSchedule));
        return createdSchedule;
      })
      .catch(function dispatchDidCreateScheduleWithError(err) {
        // Dangit. Let's let everyone know there was an issue.
        dispatch(didCreateSchedule(err));
        throw err;
      });
  };
};

// willLoadSchedule
export const WILL_LOAD_SCHEDULE = 'WILL_LOAD_SCHEDULE';
export const willLoadSchedule = function willLoadSchedule(scheduleSlug) {
  return {
    type: WILL_LOAD_SCHEDULE,
    payload: scheduleSlug,
  };
};

// didLoadSchedule
export const DID_LOAD_SCHEDULE = 'DID_LOAD_SCHEDULE';
export const didLoadSchedule = function didLoadSchedule(loadedScheduleOrError) {
  return {
    type: DID_LOAD_SCHEDULE,
    payload: loadedScheduleOrError,
    error: loadedScheduleOrError instanceof Error,
  };
};

export const loadSchedule = function loadSchedule(scheduleSlug) {
  return function loadScheduleThunk(dispatch) {
    // Let everyone know we're about to load a schedule
    dispatch(willLoadSchedule(scheduleSlug));

    // Return a promise so others can play too
    return schedule.getBySlug(scheduleSlug)
      .then(function dispatchDidLoadSchedule(loadedSchedule) {
        dispatch(didLoadSchedule(loadedSchedule));
        return loadedSchedule;
      })
      .catch(function dispatchDidLoadScheduleWithError(err) {
        dispatch(didLoadSchedule(err));
        throw err;
      });
  };
};

// unloadSchedule
export const UNLOAD_SCHEDULE = 'UNLOAD_SCHEDULE';
export const unloadSchedule = function unloadSchedule() {
  return {
    type: UNLOAD_SCHEDULE,
  };
};
