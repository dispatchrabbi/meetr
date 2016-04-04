import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import EditingToolbar from './editing-toolbar.js';
import AggregateGrid from './aggregate-grid.js';
import EditableGrid from './editable-grid.js';

export const GridSection = React.createClass({
  propTypes: {
    isUserLoggedIn: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
  },

  render: function render() {
    return (
      <section className="grid-section">
        { this.props.isUserLoggedIn ? <EditingToolbar/> : '' }
        { this.props.isEditing ? <EditableGrid/> : <AggregateGrid/> }
      </section>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    isUserLoggedIn: state.get('currentUser') !== null,
    isEditing: state.getIn(['updating', 'isEditing']),
  };
};

export default connect(
  mapStateToProps
)(GridSection);
