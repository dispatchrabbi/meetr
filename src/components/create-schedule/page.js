import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { createSchedule } from '../../actions/schedule.js';
import { loadParticipants } from '../../actions/participants.js';
import { push } from 'react-router-redux';

export const Page = React.createClass({
  propTypes: {
    onFakeButtonClick: PropTypes.func.isRequired,
  },

  buildFakeClickArgument: function buildFakeClickArgument() {
    return {
      title: 'Test Schedule',
      definite: false,
      days: [
        'Tuesday',
        'Thursday',
        'Friday',
      ],
      startTime: 39600,
      endTime: 57600,
      timezone: 'America/Chicago',
    };
  },

  render: function render() {
    return (
      <div>
        <h2>Create Schedule Page</h2>
        <button type="button" onClick={() => { this.props.onFakeButtonClick(this.buildFakeClickArgument()); }}>
          Create a fake schedule!
        </button>
      </div>
    );
  },
});

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onFakeButtonClick: function onFakeButtonClickDispatchCreateSchedule({ title, definite, days, startTime, endTime, timezone }) {
      dispatch(createSchedule(
        title,
        definite,
        days,
        startTime,
        endTime,
        timezone
      )).then(function navigateToCreatedSchedule(createdSchedule) {
        // If the schedule was created okay, navigate to show it
        dispatch(push('/schedules/' + createdSchedule.slug));
        return dispatch(loadParticipants(createdSchedule.slug));
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Page);
