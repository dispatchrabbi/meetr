import Immutable from 'immutable';
import { connect } from 'react-redux';
import ScheduleGrid from '../schedule-grid.js';

import AVAILABILITY_TYPES from '../../lib/availability-types.js';
import {
  get15MinuteIncrements,
  showLabel,
  formatTime,
} from '../../lib/schedule-grid-helpers';

import { updateUser } from '../../actions/participants';

const findAvailability = function findAvailability(availabilities, day, time) {
  return availabilities.find(a => a.get('day') === day && a.get('time') === time);
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
      value: time,
    };
  });

  const currentUserId = state.getIn(['currentUser', 'id']);
  const userParticipant = state.getIn(['currentSchedule', 'participants', 'list']).find(participant => participant.get('_id') === currentUserId);
  const selectedAvailabiltyType = state.getIn(['updating', 'selectedAvailabiltyType']);

  let cellValue = function cellValueNoOp() { return '-'; };
  // FIXME: remove this guard once all the mode switches are working
  if (userParticipant) {
    cellValue = function cellValueUser(rowValue, colValue, intersects) {
      if (intersects) {
        return AVAILABILITY_TYPES[selectedAvailabiltyType].symbol;
      }

      const availability = findAvailability(userParticipant.get('availabilities'), colValue, rowValue);
      return availability ? AVAILABILITY_TYPES[availability.get('availability')].symbol : AVAILABILITY_TYPES.busy.symbol;
    };
  }

  let cellClassName = function cellClassNoOp() { return ''; };
  if (userParticipant) {
    cellClassName = function cellClassNameUser(rowValue, colValue, intersects) {
      if (intersects) {
        return AVAILABILITY_TYPES[selectedAvailabiltyType].className;
      }

      const availability = findAvailability(userParticipant.get('availabilities'), colValue, rowValue);
      return availability ? AVAILABILITY_TYPES[availability.get('availability')].className : AVAILABILITY_TYPES.busy.className;
    };
  }

  return {
    columns: days,
    rows: times,

    cellValue,
    cellClassName,

    userParticipant,
    selectedAvailabiltyType,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateAvailabilitiesFromCells: function updateAvailabilitiesFromCells(cells, userParticipant, availabilityType) {
      const newAvailabilities = cells.map(function convertCellToAvailability(cell) {
        return {
          day: cell.colKey,
          time: +(cell.rowKey.substr(1)), // take off the 't' at the beginning, then convert to a number
          availability: availabilityType,
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
        stateProps.selectedAvailabiltyType
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
