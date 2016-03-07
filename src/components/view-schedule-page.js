import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSchedule } from '../actions/schedule.js';
import { loadParticipants, logInUser } from '../actions/participants.js';

import ScheduleParticipantsList from './schedule-participants-list.js';
import LogScheduleGrid from './log-schedule-grid.js';

const ViewSchedulePage = React.createClass({
  propTypes: {
    params: PropTypes.object,
    schedule: PropTypes.object,
    participants: PropTypes.arrayOf(PropTypes.object),
    loadScheduleBySlug: PropTypes.func,
    onLogInButtonClick: PropTypes.func,
  },

  componentDidMount: function componentDidMount() {
    if (!(this.props.schedule && this.props.schedule.slug === this.props.params.slug)) {
      this.props.loadScheduleBySlug(this.props.params.slug);
    }
  },

  // TODO: Do I need this in componentWillReceiveProps also?

  render: function render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            { this.props.schedule ? <h3>{this.props.schedule.title} ({this.props.schedule.slug})</h3> : <h3></h3> }
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-xs-0">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1 className="panel-title">Participants</h1>
              </div>
              { this.props.participants ? <ScheduleParticipantsList/> : <div></div> }
            </div>
          </div>
          <div className="col-md-8 col-xs-12">
            <div className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <ul className="nav navbar-nav navbar-left">
                    <li className="active"><button type="button" className="btn btn-link navbar-btn">Mode 1</button></li>
                    <li><button type="button" className="btn btn-link navbar-btn">Mode 2</button></li>
                  </ul>
                </div>
                <div className="navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li><button type="button" className="btn btn-primary navbar-btn">Edit Your Availability</button></li>
                  </ul>
                </div>
              </div>
            </div>
            <LogScheduleGrid/>
          </div>
        </div>
        <div className="row">
          <pre>{JSON.stringify(this.props.schedule)}</pre>
          <pre>{JSON.stringify(this.props.participants)}</pre>
        </div>
        <div className="row">
          { ['Quentin', 'Junko', 'Cornelia', 'Roscoe'].map((name, ix) => {
            return <div className="col-md-3" key={name}><button type="button" className="btn btn-default" onClick={() => { this.props.onLogInButtonClick(this.props.schedule.slug, name, 'Password' + ix); }}>Log in as {name} (Password{ix})</button></div>;
          }) }
        </div>
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    schedule: state.schedule,
    participants: state.participants,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadScheduleBySlug: function loadScheduleBySlug(slug) {
      dispatch(loadSchedule(slug))
        .then(function loadParticipantsForThatSchedule(loadedSchedule) {
          return dispatch(loadParticipants(loadedSchedule.slug));
        });
    },
    onLogInButtonClick: function onLogInButtonClickLogInUser(slug, name, password) {
      dispatch(logInUser(slug, name, password))
        .then(function reloadParticipants() {
          return dispatch(loadParticipants(slug));
        });
    },
  };
};

const ConnectedViewSchedulePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSchedulePage);

export default ConnectedViewSchedulePage;
