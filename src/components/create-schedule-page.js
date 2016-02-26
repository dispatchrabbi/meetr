import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { createSchedule } from '../actions/schedule.js';
import { push } from 'react-router-redux';

const CreateSchedulePage = React.createClass({
  propTypes: {
    onFakeButtonClick: PropTypes.func.isRequired,
  },

  buildFakeClickArgument: function buildFakeClickArgument() {
    return {
      title: 'Fake Click',
      definite: false,
      startDay: 'Tuesday',
      endDay: 'Friday',
      startDate: null,
      endDate: null,
      startTime: 3600,
      endTime: 7200,
      timezone: 'America/Baltimore',
    };
  },

  render: function render() {
    return (
      <div className="row">
        <h3>Create Schedule Page</h3>
        <button type="button" onClick={() => { this.props.onFakeButtonClick(this.buildFakeClickArgument()); }} className="btn btn-default">
          Fake button!
        </button>
      </div>
    );
  },
});

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onFakeButtonClick: function onFakeButtonClickDispatchCreateSchedule(vals) {
      dispatch(createSchedule(
        vals.title,
        vals.definite,
        vals.startDay,
        vals.endDay,
        vals.startDate,
        vals.endDate,
        vals.startTime,
        vals.endTime,
        vals.timezone
      )).then(function navigateToCreatedSchedule(createdSchedule) {
        // If the schedule was created okay, navigate to show it
        dispatch(push('/schedules/' + createdSchedule.slug));
      });
    },
  };
};

const ConnectedCreateSchedulePage = connect(
  null,
  mapDispatchToProps
)(CreateSchedulePage);

export default ConnectedCreateSchedulePage;
