import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setAvailability } from '../actions/editing.js';

const GridHeader = React.createClass({
  propTypes: {
    modes: PropTypes.arrayOf(PropTypes.object),
    selectedMode: PropTypes.string,
    onModeSelect: PropTypes.func,
  },

  render: function render() {
    return (
      <div className="grid-header">
        <h3>Availability</h3>
        <div className="mode-button-container">
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
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
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
    onModeSelect: function onModeSelectChangeMode(selectedMode) {
      dispatch(setAvailability(selectedMode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridHeader);
