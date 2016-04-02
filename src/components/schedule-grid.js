import React, { PropTypes } from 'react';
import { intersect } from '../lib/intersect.js';

// TODO: Refactor this into an actual schedule grid that knows how to interpret a schedule
// or possible a Grid and a Schedule Grid, if the logic should be separated.
const ScheduleGrid = React.createClass({
  propTypes: {
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string.isRequired,
    })).isRequired,

    rows: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string.isRequired,
    })).isRequired,

    cellClassName: PropTypes.func,
    cellValue: PropTypes.func,
    onSelectCells: PropTypes.func,
  },

  getInitialState: function getInitialState() {
    return {
      mouseDownPoint: null,
      mouseMovePoint: null,
    };
  },

  componentWillMount: function componentWillMount() {
    this.cellRects = {};
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('mousemove', this.updateMouseMovements);
    window.addEventListener('mouseup', this.clearAndReportMouseMovements);
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    this.setState({
      mouseDownPoint: null,
      mouseMovePoint: null,
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('mousemove', this.updateMouseMovements);
    window.removeEventListener('mouseup', this.clearAndReportMouseMovements);
  },

  getIntersectingCells: function getIntersectingCells() {
    return Object.keys(this.cellRects)
      .filter(cellKey => this.doesCellIntersectMouseRegion(cellKey))
      .map(cellKey => {
        return {
          rowKey: this.cellRects[cellKey].rowKey,
          colKey: this.cellRects[cellKey].colKey,
        };
      });
  },

  doesCellIntersectMouseRegion: function doesCellIntersectMouseRegion(cellKey) {
    if (!this.state.mouseDownPoint) {
      return false;
    }

    return intersect(this.cellRects[cellKey].rect, {
      top: this.state.mouseDownPoint.y,
      left: this.state.mouseDownPoint.x,
      bottom: this.state.mouseMovePoint.y,
      right: this.state.mouseMovePoint.x,
    });
  },

  registerCellRect: function registerCellRect(cellKey, rowKey, colKey, el) {
    if (el) {
      this.cellRects[cellKey] = {
        rect: el.getBoundingClientRect(),
        rowKey,
        colKey,
      };
    } else {
      // component is unmounting; `el` will be null
      delete this.cellRects[cellKey];
    }
  },

  startLoggingMouseMovements: function startLoggingMouseMovements(ev) {
    ev.preventDefault();
    if (ev.button === /* primary button */0) {
      this.setState({
        mouseDownPoint: { x: ev.clientX, y: ev.clientY },
        mouseMovePoint: { x: ev.clientX, y: ev.clientY },
      });
    }
  },
  updateMouseMovements: function updateMouseMovements(ev) {
    ev.preventDefault();
    if (this.state.mouseDownPoint !== null) {
      this.setState({
        mouseMovePoint: { x: ev.clientX, y: ev.clientY },
      });
    }
  },
  clearAndReportMouseMovements: function clearAndReportMouseMovements(/* ev */) {
    if (this.state.mouseDownPoint) {
      this.props.onSelectCells(this.getIntersectingCells());
    }

    this.setState({
      mouseDownPoint: null,
      mouseMovePoint: null,
    });
  },

  render: function render() {
    return (
      <table className="schedule-grid" onMouseDown={this.startLoggingMouseMovements} onMouseMove={this.updateMouseMovements} onMouseUp={this.clearAndReportMouseMovements}>
        <thead>
          <tr>
            <th key="origin">@</th>
            {this.props.columns.map(column => { return <th key={'header-' + column.key}>{column.label}</th>; })}
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map(row => {
            return (<tr key={'row-' + row.key}>
              <th key={'lheader-' + row.key}>{row.label}</th>
              {this.props.columns.map(column => {
                const key = 'cell-' + column.key + '-' + row.key;
                const intersects = this.doesCellIntersectMouseRegion(key);

                return (
                  <td
                    className={ this.props.cellClassName ? this.props.cellClassName(row.value, column.value, intersects) : '' }
                    key={key}
                    ref={(el) => { this.registerCellRect(key, row.key, column.key, el); }}
                  >{ this.props.cellValue ? this.props.cellValue(row.value, column.value, intersects) : '' }</td>
                );
              })}
            </tr>);
          })}
        </tbody>
      </table>
    );
  },
});

export default ScheduleGrid;
