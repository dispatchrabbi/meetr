import moment from 'moment';

const FIFTEEN_MINUTES_IN_SECONDS = 15 * 60;

export const roundToNearest15MinuteMark = function roundToNearest15MinuteMark(timeAfterMidnightInSeconds, roundUp = false) {
  const timeAfter15MinuteMark = timeAfterMidnightInSeconds % FIFTEEN_MINUTES_IN_SECONDS;
  if (timeAfter15MinuteMark === 0) {
    return timeAfterMidnightInSeconds;
  }
  return roundUp ?
    timeAfterMidnightInSeconds + (FIFTEEN_MINUTES_IN_SECONDS - timeAfter15MinuteMark) :
    timeAfterMidnightInSeconds - timeAfter15MinuteMark;
};

export const get15MinuteIncrements = function get15MinuteIncrements(startTime, endTime) {
  const startTimeRounded = roundToNearest15MinuteMark(startTime, false);
  const endTimeRounded = roundToNearest15MinuteMark(endTime, true);

  const increments = [];
  let currentTime = startTimeRounded;
  while (currentTime < endTimeRounded) {
    increments.push(currentTime);
    currentTime += FIFTEEN_MINUTES_IN_SECONDS;
  }

  return increments;
};

export const showLabel = function showLabel(time, isFirst) {
  return isFirst || !(time % 3600); // show a label for the first one and if the time is an hour
};

export const whichMinute = function whichMinute(time) {
  return Math.floor((time % 3600) / 60);
};

export const formatTime = function formatTime(time) {
  return moment().startOf('day').add(time, 'seconds').format('H:mm');
};
