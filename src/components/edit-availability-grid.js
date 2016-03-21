import _ from 'lodash';
import { connect } from 'react-redux';
import ScheduleGrid from './schedule-grid';
import {
  get15MinuteIncrements,
  showLabel,
  formatTime,
} from '../lib/schedule-grid-helpers';
import { updateUser } from '../actions/participants';

const availabilityModes = {
  free: { symbol: '✓', className: 'free' },
  ifneedbe: { symbol: '?', className: 'ifneedbe' },
  busy: { symbol: '✕', className: 'busy' },
};

// TODO: Add timezone support
const mapStateToProps = function mapStateToProps(state) {
  // TODO: Allow for definite schedules
  const days = state.schedule.days.map(day => { return { key: day.toLowerCase(), label: day, value: day.toLowerCase() }; });
  const times = get15MinuteIncrements(state.schedule.startTime, state.schedule.endTime).map((time, ix) => {
    return {
      key: 't' + time,
      label: showLabel(time, ix === 0) ? formatTime(time) : '',
      value: time,
    };
  });

  const userParticipant = state.currentUser && _.find(state.participants, { _id: state.currentUser });

  let cellValue = function cellValueNoOp() { return '-'; };
  if (userParticipant) {
    cellValue = function cellValueUser(rowValue, colValue, intersects) {
      if (intersects) {
        return availabilityModes[state.availabilityMode].symbol;
      }

      const availability = _.find(userParticipant.availabilities, {
        day: colValue,
        time: rowValue,
      });
      return availability ? availabilityModes[availability.availability].symbol : availabilityModes.busy.symbol;
    };
  }

  let cellClassName = function cellClassNoOp() { return ''; };
  if (userParticipant) {
    cellClassName = function cellClassNameUser(rowValue, colValue, intersects) {
      if (intersects) {
        return availabilityModes[state.availabilityMode].className;
      }

      const availability = _.find(userParticipant.availabilities, {
        day: colValue,
        time: rowValue,
      });
      return availability ? availabilityModes[availability.availability].className : availabilityModes.busy.className;
    };
  }

  return {
    columns: days,
    rows: times,

    cellValue,
    cellClassName,

    userParticipant,
    availabilityMode: state.availabilityMode,
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

      const updatedAvailabilities = newAvailabilities.reduce(function mergeAvailabilities(availabilities, eachAvailability) {
        const availabilityToUpdate = _.find(availabilities, { day: eachAvailability.day, time: eachAvailability.time });
        if (availabilityToUpdate) {
          availabilityToUpdate.availability = eachAvailability.availability;
        } else {
          availabilities.push(eachAvailability);
        }

        return availabilities;
      }, [].concat(userParticipant.availabilities));
      // TODO: Sort the availabilities for convenience's sake?

      dispatch(updateUser(userParticipant._id, updatedAvailabilities));
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
