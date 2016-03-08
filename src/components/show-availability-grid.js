import _ from 'lodash';
import { connect } from 'react-redux';
import ScheduleGrid from './schedule-grid';
import {
  get15MinuteIncrements,
  showLabel,
  formatTime,
} from '../lib/schedule-grid-helpers.js';

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
  // TODO: Allow for definite schedules
  const days = state.schedule.days.map(day => { return { key: day.toLowerCase(), label: day, value: day }; });
  const times = get15MinuteIncrements(state.schedule.startTime, state.schedule.endTime).map((time, ix) => {
    return {
      key: 't' + time,
      label: showLabel(time, ix === 0) ? formatTime(time) : '',
      value: time,
    };
  });

  const cellValue = function cellValueShowAllAvailability(rowValue, colValue) {
    const tallies = tallyAvailabilities(state.participants, colValue, rowValue);

    return [tallies.free, tallies.ifneedbe, tallies.busy].join(' / ');
  };

  const cellClassName = function cellClassByMassAvailability() {
    // TODO: Do funky colors
    return '';
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

const ShowAvailabilityGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleGrid);

export default ShowAvailabilityGrid;
