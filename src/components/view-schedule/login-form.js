import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { updateLoginForm } from '../../actions/login-form.js';
import { logInUser, loadParticipants } from '../../actions/participants.js';

export const LoginForm = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,

    isLoggingIn: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),

    onFieldUpdate: PropTypes.func,
    onLoginButtonClick: PropTypes.func,
  },

  render: function render() {
    return (
      <div className="login-form">
        <p>{'In order to mark when you\'re available, log in with a name and a(n optional) password. You will be able to use this name and password to come back later and make further changes to your availability.'}</p>
        <label htmlFor="login-form-name">Name *</label>
        <input type="text" id="login-form-name" value={this.props.name} onChange={(ev) => this.props.onFieldUpdate('name', ev.target.value)} />
        <label htmlFor="login-form-password">Password</label>
        <input type="password" id="login-form-password" value={this.props.password} onChange={(ev) => this.props.onFieldUpdate('password', ev.target.value)} />
        { this.props.error ? <div>{this.props.error.message}</div> : '' }
        <button type="submit" onClick={() => { this.props.onLoginButtonClick(this.props.name, this.props.password); }}>Log{ this.props.isLoggingIn ? 'ging' : '' } In</button>
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    name: state.getIn(['loginForm', 'fields', 'name']),
    password: state.getIn(['loginForm', 'fields', 'password']),

    isLoggingIn: state.getIn(['loginForm', 'isLoggingIn']),
    error: state.getIn(['loginForm', 'error']),

    scheduleSlug: state.getIn(['currentSchedule', 'schedule', 'obj', 'slug']),
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onFieldUpdate: function onFormUpdate(fieldName, newValue) {
      dispatch(updateLoginForm(fieldName, newValue));
    },
    onLoginButtonClick: function onLoginButtonClick(scheduleSlug, username, password) {
      dispatch(logInUser(scheduleSlug, username, password))
        .then(function reloadParticipants() {
          return dispatch(loadParticipants(scheduleSlug));
        });
    },
  };
};

const mergeProps = function mergeProps(stateProps, dispatchProps) {
  return {
    name: stateProps.name,
    password: stateProps.password,
    isLoggingIn: stateProps.isLoggingIn,
    error: stateProps.error,

    onFieldUpdate: dispatchProps.onFieldUpdate,
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
