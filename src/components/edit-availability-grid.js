import _ from 'lodash';
import { connect } from 'react-redux';
import ScheduleGrid from './schedule-grid';
import {
  get15MinuteIncrements,
  showLabel,
  formatTime,
} from '../lib/schedule-grid-helpers.js';

// TODO: Add timezone support
const mapStateToProps = function mapStateToProps(state) {
  // TODO: Allow for definite schedules
  const days = state.schedule.days.map(day => { return { key: day.toLowerCase(), label: day, value: day }; });
  const times = get15MinuteIncrements().map((time, ix) => {
    return {
      key: 't' + time,
      label: showLabel(time, ix === 0) ? formatTime(time) : '',
      value: time,
    };
  });

  let cellValue = function cellValueNoOp() { return '-'; };
  if (state.userParticipant) {
    cellValue = function cellValueUser(rowValue, colValue, intersects) {
      if (intersects) {
        return '✓';
      }

      const availability = _.find(state.userParticipant.availabilities, {
        day: rowValue,
        time: colValue,
      });
      return availability ? availability.availability : '✕';
    };
  }

  let cellClassName = function cellClassNoOp() { return ''; };
  if (state.userParticipant) {
    cellClassName = function cellClassNameUser(rowValue, colValue, intersects) {
      if (intersects) {
        return 'free';
      }

      const availability = _.find(state.userParticipant.availabilities, {
        day: rowValue,
        time: colValue,
      });
      return availability ? availability.availability : 'busy';
    };
  }

  return {
    columns: days,
    rows: times,

    cellValue,
    cellClassName,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSelectCells: function onSelectCells(cells) {
      console.log('onSelectCells called', cells);
    },
  };
};

const EditAvailabilityGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleGrid);

export default EditAvailabilityGrid;
