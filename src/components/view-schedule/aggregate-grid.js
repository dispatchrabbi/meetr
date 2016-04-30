import _ from 'lodash';

import { connect } from 'react-redux';
import ScheduleGrid from '../schedule-grid.js';

import AVAILABILITY_TYPES from '../../lib/availability-types.js';
import {
  get15MinuteIncrements,
  showLabel,
  whichMinute,
  formatTime,
} from '../../lib/schedule-grid-helpers.js';

const tallyAvailabilities = function tallyAvailabilities(participants, day, time) {
  return _(participants).map('availabilities').reduce(function tally(tallies, availabilityArray) {
    const availability = _.find(availabilityArray, { day, time });

    tallies[availability ? availability.availability : 'busy'] += 1;
    return tallies;
  }, {
    busy: 0,
    free: 0,
    ifneedbe: 0,
  }).valueOf();
};

// TODO: Add timezone support
const mapStateToProps = function mapStateToProps(state) {
  const schedule = state.getIn(['currentSchedule', 'schedule', 'obj']).toJS();

  // TODO: Allow for definite schedules
  const days = schedule.days.map(day => { return { key: day.toLowerCase(), label: day, value: day.toLowerCase() }; });
  const times = get15MinuteIncrements(schedule.startTime, schedule.endTime).map((time, ix) => {
    return {
      key: 't' + time,
      label: showLabel(time, ix === 0) ? formatTime(time) : '',
      className: 'm' + whichMinute(time),
      value: time,
    };
  });

  const cellValue = function cellValueShowAllAvailability(rowValue, colValue) {
    const tallies = tallyAvailabilities(state.getIn(['currentSchedule', 'participants', 'list']).toJS(), colValue, rowValue);

    return [
      `${tallies.free} ${AVAILABILITY_TYPES.free.symbol}`,
      `${tallies.ifneedbe} ${AVAILABILITY_TYPES.ifneedbe.symbol}`,
      `${tallies.busy} ${AVAILABILITY_TYPES.busy.symbol}`,
    ].join(' / ');
  };

  const cellClassName = function cellClassByMassAvailability(rowValue, colValue) {
    // FIXME: This algorithm could be a lot better.
    const tallies = tallyAvailabilities(state.getIn(['currentSchedule', 'participants', 'list']).toJS(), colValue, rowValue);
    const numberOfParticipants = state.getIn(['currentSchedule', 'participants', 'list']).size;

    let className = 'totally-busy';
    if (tallies.free === numberOfParticipants) {
      className = 'best-choice';
    } else if (tallies.busy === numberOfParticipants) {
      className = 'totally-busy';
    } else {
      const percentageOkay = (tallies.free + (tallies.ifneedbe * 0.5)) / numberOfParticipants;
      // 5 tiers, numbered 0-4. Figure out which 20% the percentage is in.
      className = 'tier' + Math.floor(percentageOkay / 0.2);
    }

    return className;
  };

  return {
    columns: days,
    rows: times,

    cellValue,
    cellClassName,
  };
};

const mapDispatchToProps = function mapDispatchToProps(/* dispatch */) {
  return {
    onSelectCells: _.noop,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleGrid);
