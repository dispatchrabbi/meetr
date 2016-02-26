import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { unloadSchedule } from '../actions/schedule.js';
import { push } from 'react-router-redux';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    onHeaderClick: PropTypes.func,
  },

  render: function render() {
    return (
      <div className="container">
        <div className="page-header row">
          <h1 onClick={this.props.onHeaderClick}>Meetr <small>Like when2jeremy but better.</small></h1>
        </div>
        {this.props.children}
      </div>
    );
  },
});

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onHeaderClick: function onHeaderClickUnloadSchedule() {
      // Unload the schedule...
      dispatch(unloadSchedule());

      // ... then navigate back to the home page (if we're not there already)
      if (location.pathname !== '/') {
        dispatch(push('/'));
      }
    },
  };
};

const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App);

export default ConnectedApp;
