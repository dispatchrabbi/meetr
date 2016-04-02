import Immutable from 'immutable';
import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import ParticipantsList from './participants-list.js';
import LoginForm from './login-form.js';

import { logOutUser } from '../../actions/participants.js';

export const Participants = React.createClass({
  propTypes: {
    isUserLoggedIn: PropTypes.bool.isRequired,
    logOutUser: PropTypes.func.isRequired,
  },

  getInitialState: function getInitialState() {
    return Immutable.fromJS({
      loginFormDeployed: false,
    });
  },
  toggleLoginForm: function toggleLoginForm() {
    this.setState(this.state.set('loginFormDeployed', !this.state.get('loginFormDeployed')));
  },

  render: function render() {
    return (
      <section className="participants">
        <h3>
          Participants
          {
            this.props.isUserLoggedIn ?
            <button onClick={this.props.logOutUser}>Log Out</button> :
            <button onClick={this.toggleLoginForm}>{this.state.get('loginFormDeployed') ? 'Cancel' : 'Log In'}</button>
          }
        </h3>
        <ParticipantsList/>
        { this.state.get('loginFormDeployed') ? <LoginForm/> : '' }
      </section>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    isUserLoggedIn: state.getIn(['currentUser', 'id']) !== null,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logOutUser: function dispatchLogOutUser() {
      dispatch(logOutUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Participants);
