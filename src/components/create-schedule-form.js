import { connect } from 'react-redux';
import { createSchedule } from '../actions/schedule.js';
import ScheduleForm from './schedule-form.js';

const SUBMIT_TEXT = 'bamf!';

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSubmitting: state.get('isCreatingSchedule'),
    submitError: state.get('scheduleCreationError'),
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSubmitClick: function onSubmitClickCreateSchedule({ title, definite, days, startTime, endTime, timezone }) {
      dispatch(createSchedule(
        title,
        definite,
        days,
        startTime,
        endTime,
        timezone
      ));
    },
  };
};

const CreateScheduleForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps, { submitText: SUBMIT_TEXT })
)(ScheduleForm);

export default CreateScheduleForm;
