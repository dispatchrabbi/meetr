import { connect } from 'react-redux';
import ScheduleGrid from './schedule-grid';

const mapStateToProps = null;
const mapDispatchToProps = null;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = (new Array(8 /* hours we want */ * 4 /* qtr hours in an hour */)).fill(null).map((_, ix) => {
  return (ix * 900 /* seconds per qtr hour */) + (9 * 3600 /* 9:00 */);
});

const LogScheduleGrid = connect(
  mapStateToProps,
  mapDispatchToProps,
  function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({
      columns: days.map(day => { return { key: day.toLowerCase(), label: day }; }),
      rows: times.map(time => { return { key: 't' + time, label: time % 3600 ? null : Math.trunc(time / 3600) + ':00' }; }),

      cellValue: function cellValue(rowKey, colKey, intersects) {
        return intersects ? '✓' : '✕';
      },
      cellClassName: function cellValue(rowKey, colKey, intersects) {
        return intersects ? 'success' : 'danger';
      },

      onSelectCells: function onSelectCells(cells) {
        console.log('onSelectCells called', cells);
      },
    }, ownProps, stateProps, dispatchProps);
  }
)(ScheduleGrid);

export default LogScheduleGrid;
