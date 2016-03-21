import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setAvailability, setEditingSchedule } from '../actions/editing.js';

const GridHeader = React.createClass({
  propTypes: {
    currentUser: PropTypes.string,
    isEditingSchedule: PropTypes.boolean,
    onEditSet: PropTypes.func,

    modes: PropTypes.arrayOf(PropTypes.object),
    selectedMode: PropTypes.string,
    onModeSelect: PropTypes.func,
  },

  render: function render() {
    return (
      <div className="grid-header">
        <h3>Availability</h3>
        {
          this.props.currentUser ? (
            <div className="mode-button-container">
              <button
                className={'mode-button edit' + (this.props.isEditingSchedule ? ' selected' : '')}
                onClick={() => { this.props.onEditSet(!this.props.isEditingSchedule); }}
              >{this.props.isEditingSchedule ? 'Stop Editing' : 'Start Editing'}</button>
              {
                this.props.modes.map(mode => {
                  return (<button
                    key={mode.type}
                    className={'mode-button ' + mode.type + (this.props.selectedMode === mode.type ? ' selected' : '')}
                    onClick={() => { this.props.onModeSelect(mode.type); }}
                  >{mode.label}</button>);
                })
              }
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isEditingSchedule: state.isEditingSchedule,

    modes: [
      { type: 'free', label: '✓ Free' },
      { type: 'ifneedbe', label: '? If Need Be' },
      { type: 'busy', label: '✕ Busy' },
    ],
    selectedMode: state.availabilityMode,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onEditSet: function onEditSetSetEditingSchedule(isEditing) {
      dispatch(setEditingSchedule(isEditing));
    },
    onModeSelect: function onModeSelectChangeMode(selectedMode) {
      dispatch(setAvailability(selectedMode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridHeader);
