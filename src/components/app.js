import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { unloadSchedule } from '../actions/schedule.js';
import { push } from 'react-router-redux';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    userParticipant: PropTypes.object,
    onHeaderClick: PropTypes.func,
  },

  render: function render() {
    return (
      <div className="container">
        <div className="page-header row">
          <h1>
            <span onClick={this.props.onHeaderClick}>Meetr</span>
            {' '}
            <small>Like when2jeremy but better.</small>
            <div style={{ float: 'right' }}><small>{this.props.userParticipant ? `Logged in as ${this.props.userParticipant.name}` : ''}</small></div>
          </h1>
        </div>
        {this.props.children}
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    userParticipant: state.userParticipant,
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
