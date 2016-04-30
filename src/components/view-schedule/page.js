import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import GridSection from './grid-section.js';
import ParticipantsSection from './participants-section.js';

import { loadSchedule } from '../../actions/schedule.js';
import { loadParticipants } from '../../actions/participants.js';

export const Page = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    schedule: ImmutablePropTypes.map,
    showPage: PropTypes.bool.isRequired,
    loadScheduleBySlug: PropTypes.func.isRequired,
  },

  componentDidMount: function componentDidMount() {
    // Load the schedule if it's not loaded or if it's not the right schedule (based on the URL)
    if (!(this.props.schedule && this.props.schedule.get('slug') === this.props.params.slug)) {
      this.props.loadScheduleBySlug(this.props.params.slug);
    }
  },

  render: function render() {
    return this.props.showPage ? (
      <section className="page">
        <h2>{this.props.schedule.get('title')}</h2>
        <GridSection />
        <ParticipantsSection />
      </section>
    ) : (
      <section className="page">
        <h2>Loading {this.props.params.slug}...</h2>
      </section>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    schedule: state.getIn(['currentSchedule', 'schedule', 'obj']),
    showPage: !!(state.getIn(['currentSchedule', 'schedule', 'obj']) && state.getIn(['currentSchedule', 'participants', 'list'])),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
