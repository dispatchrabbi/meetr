import Immutable from 'immutable';
import { connect } from 'react-redux';
import ScheduleGrid from './schedule-grid';
import {
  get15MinuteIncrements,
  showLabel,
  formatTime,
} from '../lib/schedule-grid-helpers';
import { updateUser } from '../actions/participants';

// TODO: Refactor this out to a more-useful const somewhere else
const availabilityModes = {
  free: { symbol: '✓', className: 'free' },
  ifneedbe: { symbol: '?', className: 'ifneedbe' },
  busy: { symbol: '✕', className: 'busy' },
};

const findAvailability = function findAvailability(availabilities, day, time) {
  return availabilities.find(a => a.get('day') === day && a.get('time') === time);
};

// TODO: Add timezone support
const mapStateToProps = function mapStateToProps(state) {
  const schedule = state.get('schedule').toJS();

  // TODO: Allow for definite schedules
  const days = schedule.days.map(day => { return { key: day.toLowerCase(), label: day, value: day.toLowerCase() }; });
  const times = get15MinuteIncrements(schedule.startTime, schedule.endTime).map((time, ix) => {
    return {
      key: 't' + time,
      label: showLabel(time, ix === 0) ? formatTime(time) : '',
      value: time,
    };
  });

  const userParticipant = state.get('participants').find(participant => participant.get('_id') === state.get('currentUser'));
  const availabilityMode = state.get('availabilityMode');

  let cellValue = function cellValueNoOp() { return '-'; };
  // FIXME: remove this guard once all the mode switches are working
  if (userParticipant) {
    cellValue = function cellValueUser(rowValue, colValue, intersects) {
      if (intersects) {
        return availabilityModes[availabilityMode].symbol;
      }

      const availability = findAvailability(userParticipant.get('availabilities'), colValue, rowValue);
      return availability ? availabilityModes[availability.get('availability')].symbol : availabilityModes.busy.symbol;
    };
  }

  let cellClassName = function cellClassNoOp() { return ''; };
  if (userParticipant) {
    cellClassName = function cellClassNameUser(rowValue, colValue, intersects) {
      if (intersects) {
        return availabilityModes[availabilityMode].className;
      }

      const availability = findAvailability(userParticipant.get('availabilities'), colValue, rowValue);
      return availability ? availabilityModes[availability.get('availability')].className : availabilityModes.busy.className;
    };
  }

  return {
    columns: days,
    rows: times,

    cellValue,
    cellClassName,

    userParticipant,
    availabilityMode: state.get('availabilityMode'),
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateAvailabilitiesFromCells: function updateAvailabilitiesFromCells(cells, userParticipant, availabilityMode) {
      const newAvailabilities = cells.map(function convertCellToAvailability(cell) {
        return {
          day: cell.colKey,
          time: +(cell.rowKey.substr(1)), // take off the 't' at the beginning, then convert to a number
          availability: availabilityMode,
        };
      });

      const updatedAvailabilities = newAvailabilities.reduce(function mergeAvailabilities(availabilities, newAvailability) {
        return availabilities
          .filterNot(a => a.get('day') === newAvailability.day && a.get('time') === newAvailability.time)
          .push(Immutable.fromJS(newAvailability));
      }, userParticipant.get('availabilities'));
      // TODO: Sort the availabilities for convenience's sake?

      dispatch(updateUser(userParticipant.get('_id'), updatedAvailabilities.toJS()));
    },
  };
};

const mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    columns: stateProps.columns,
    rows: stateProps.rows,

    cellValue: stateProps.cellValue,
    cellClassName: stateProps.cellClassName,

    onSelectCells: function onSelectCellsUpdateAvailabilities(cells) {
      dispatchProps.updateAvailabilitiesFromCells(
        cells,
        stateProps.userParticipant,
        stateProps.availabilityMode
      );
    },
  });
};

const EditAvailabilityGrid = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ScheduleGrid);

export default EditAvailabilityGrid;
