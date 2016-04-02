import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { logInUser } from '../../actions/participants.js';

export const LoginForm = React.createClass({
  propTypes: {
    isLoggingIn: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),

    onLoginButtonClick: PropTypes.func,
  },

  render: function render() {
    return (
      <div className="login-form">
        <div>LOGIN{ this.props.isLoggingIn ? 'G IN' : '' } FORRRRRM!</div>
        { this.props.error ? <div>{this.props.error.message}</div> : '' }
        <button onClick={() => { this.props.onLoginButtonClick('Junko', 'Password1'); }}>Log{ this.props.isLoggingIn ? 'ging' : '' } In</button>
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    isLoggingIn: state.getIn(['currentUser', 'isLoggingIn']),
    error: state.getIn(['currentUser', 'error']),
    scheduleSlug: state.getIn(['currentSchedule', 'schedule', 'obj', 'slug']),
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLoginButtonClick: function onLoginButtonClick(scheduleSlug, username, password) {
      dispatch(logInUser(scheduleSlug, username, password));
    },
  };
};

const mergeProps = function mergeProps(stateProps, dispatchProps) {
  return {
    isLoggingIn: stateProps.isLoggingIn,
    error: stateProps.error,

    onLoginButtonClick: function onLoginButtonClick(username, password) {
      dispatchProps.onLoginButtonClick(stateProps.scheduleSlug, username, password);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LoginForm);
