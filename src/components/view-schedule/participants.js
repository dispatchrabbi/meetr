import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import ParticipantsList from './participants-list.js';
import LoginForm from './login-form.js';

import { setVisibility } from '../../actions/login-form.js';
import { logOutUser } from '../../actions/participants.js';

export const Participants = React.createClass({
  propTypes: {
    showLoginForm: PropTypes.bool.isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired,

    logOutUser: PropTypes.func.isRequired,
    setLoginFormVisibility: PropTypes.func.isRequired,
  },

  toggleLoginForm: function toggleLoginForm() {
    this.props.setLoginFormVisibility(!this.props.showLoginForm);
  },

  render: function render() {
    return (
      <section className="participants">
        <header>
          <h3 className="title">Participants</h3>
          <div className="buttons">
            {
              this.props.isUserLoggedIn ?
              <button onClick={this.props.logOutUser}>Log Out</button> :
              <button onClick={this.toggleLoginForm}>{this.props.showLoginForm ? 'Cancel' : 'Log In'}</button>
            }
          </div>
        </header>
        <ParticipantsList/>
        { this.props.showLoginForm ? <LoginForm/> : '' }
      </section>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    showLoginForm: state.getIn(['loginForm', 'isVisible']),
    isUserLoggedIn: state.get('currentUser') !== null,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logOutUser: function dispatchLogOutUser() {
      dispatch(logOutUser());
    },
    setLoginFormVisibility: function setLoginFormVisibility(shouldBeVisible) {
      dispatch(setVisibility(shouldBeVisible));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Participants);
