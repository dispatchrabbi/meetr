import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AVAILABILITY_TYPES from '../../lib/availability-types.js';
import {
  setAvailability,
  setEditingSchedule,
} from '../../actions/editing.js';

export const EditingToolbar = React.createClass({
  propTypes: {
    isEditingSchedule: PropTypes.bool.isRequired,
    onEditSet: PropTypes.func.isRequired,

    modes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      className: PropTypes.string,
    })).isRequired,
    selectedMode: PropTypes.string.isRequired,
    onModeSelect: PropTypes.func.isRequired,
  },

  render: function render() {
    return (
      <div className="editing-toolbar">
        <button
          onClick={() => { this.props.onEditSet(!this.props.isEditingSchedule); }}
        >{ this.props.isEditingSchedule ? 'Done' : 'Edit' }</button>
        <div className="mode-buttons">
        {
          this.props.modes.map(mode => (
              <button
                key={mode.key}
                className={['mode-button', mode.key, this.props.selectedMode === mode.key].join(' ')}
                onClick={() => { this.props.onModeSelect(mode.key); }}
              >{mode.label}</button>
          ))
        }
        </div>
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    isEditingSchedule: state.getIn(['updating', 'isEditing']),

    modes: Object.keys(AVAILABILITY_TYPES).map(type => ({
      key: AVAILABILITY_TYPES[type].key,
      label: AVAILABILITY_TYPES[type].symbol + ' ' + AVAILABILITY_TYPES[type].label,
      className: AVAILABILITY_TYPES[type].className,
    })),
    selectedMode: state.getIn(['updating', 'selectedAvailabiltyType']),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditingToolbar);
