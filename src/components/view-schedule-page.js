import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSchedule } from '../actions/schedule.js';
import { loadParticipants } from '../actions/participants.js';

const ViewSchedulePage = React.createClass({
  propTypes: {
    params: PropTypes.object,
    schedule: PropTypes.object,
    participants: PropTypes.arrayOf(PropTypes.object),
    loadScheduleBySlug: PropTypes.func,
  },

  componentDidMount: function componentDidMount() {
    if (!(this.props.schedule && this.props.schedule.slug === this.props.params.slug)) {
      this.props.loadScheduleBySlug(this.props.params.slug);
    }
  },

  // TODO: Do I need this in componentWillReceiveProps also?

  render: function render() {
    return (
      <div className="row">
        <h3>View Schedule Page ({this.props.params.slug})</h3>
        <pre>{JSON.stringify(this.props.schedule)}</pre>
        <pre>{JSON.stringify(this.props.participants)}</pre>
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
  };
};

const ConnectedViewSchedulePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSchedulePage);

export default ConnectedViewSchedulePage;
