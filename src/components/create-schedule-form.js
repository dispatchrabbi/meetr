import { connect } from 'react-redux';
import { createSchedule } from '../actions/schedule.js';
import ScheduleForm from './schedule-form.js';

const SUBMIT_TEXT = 'bamf!';

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSubmitting: state.isCreatingSchedule,
    submitError: state.scheduleCreationError,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSubmitClick: function onSubmitClickCreateSchedule(vals) {
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
