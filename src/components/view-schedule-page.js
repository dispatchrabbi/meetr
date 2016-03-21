import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSchedule } from '../actions/schedule.js';
import { loadParticipants, logInUser } from '../actions/participants.js';

import GridHeader from './grid-header.js';
import ShowAvailabilityGrid from './show-availability-grid.js';
import EditAvailabilityGrid from './edit-availability-grid.js';

import ScheduleParticipantsList from './schedule-participants-list.js';

const ViewSchedulePage = React.createClass({
  propTypes: {
    params: PropTypes.object,
    schedule: PropTypes.object,
    participants: PropTypes.arrayOf(PropTypes.object),
    isEditingSchedule: PropTypes.bool,
    loadScheduleBySlug: PropTypes.func,
    onLogInButtonClick: PropTypes.func,
  },

  componentDidMount: function componentDidMount() {
    if (!(this.props.schedule && this.props.schedule.slug === this.props.params.slug)) {
      this.props.loadScheduleBySlug(this.props.params.slug);
    }
  },

  render: function render() {
    const scheduleGridContainerContents = this.props.participants ? [
      <GridHeader/>,
      this.props.isEditingSchedule ? <EditAvailabilityGrid/> : <ShowAvailabilityGrid/>,
    ] : '';

    return (
      <div>
        <h2>{this.props.schedule ? this.props.schedule.title : '...'}</h2>
        <section id="schedule-container">
          <section className="schedule-grid-container">
            {scheduleGridContainerContents}
          </section>
          <section className="participants-list-container">
            <h3>Participants</h3>
            { this.props.participants ? <ScheduleParticipantsList/> : <div></div> }
          </section>
        </section>
        <section className="debug">
          <pre>{JSON.stringify(this.props.schedule)}</pre>
          <pre>{JSON.stringify(this.props.participants)}</pre>
        </section>
        <section className="debug-buttons">
        { ['Quentin', 'Junko', 'Cornelia', 'Roscoe'].map((name, ix) => {
          return <div className="debug-button-cell" key={name}><button type="button" onClick={() => { this.props.onLogInButtonClick(this.props.schedule.slug, name, 'Password' + ix); }}>Log in as {name} (Password{ix})</button></div>;
        }) }
        </section>
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    schedule: state.schedule,
    participants: state.participants,
    isEditingSchedule: state.isEditingSchedule,
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
