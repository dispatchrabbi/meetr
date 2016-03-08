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
      <div id="app">
        <header>
          <h1 onClick={this.props.onHeaderClick}>
            Meetr
            {' '}
            <span className="slogan">Like when2jeremy but better.</span>
          </h1>
        </header>
        <section className="content">
          {this.props.children}
        </section>
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
