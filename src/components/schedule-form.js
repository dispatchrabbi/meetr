import React, { PropTypes } from 'react';

const ScheduleForm = React.createClass({
  propTypes: {
    submitText: PropTypes.string.isRequired,
    onSubmitClick: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
  },

  getInitialState: function getInitialState() {
    return {
      definite: false,
    };
  },
  setDefinite: function setDefinite(ev) {
    this.setState({
      definite: ev.target.checked,
    });
  },

  buildSubmitClickArgument: function buildSubmitClickArgument() {
    return {
      title: this.refs.title.value,
      definite: this.state.definite,
      startDay: this.refs.startDay ? this.refs.startDay.value : null,
      endDay: this.refs.endDay ? this.refs.endDay.value : null,
      startDate: this.refs.startDate ? this.refs.startDate.value : null,
      endDate: this.refs.endDate ? this.refs.endDate.value : null,
      startTime: this.refs.startTime.value,
      endTime: this.refs.endTime.value,
      timezone: this.refs.timezone.value,
    };
  },

  render: function render() {
    // FIXME: Make this form work, look, and act better
    // TODO: make the form element IDs real unique IDs, probably with componentDidMount
    // TODO: inline/instant validation
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label" htmlFor="title">Title</label>
          <input className="form-control" id="title" ref="title" />
        </div>
        <div className="form-group">
          <label htmlFor="definite">Days</label>
          <div className="checkbox">
            <label><input type="checkbox" id="definite" checked={this.state.definite} onChange={this.setDefinite} /> Use specific dates</label>
          </div>
          {
            this.state.definite ?
            <div>
              <label className="control-label" htmlFor="startDate">Start date:</label>
              <input className="form-control" id="startDate" ref="startDate" />
              <label className="control-label" htmlFor="endDate">End date:</label>
              <input className="form-control" id="endDate" ref="endDate" />
            </div>
            :
            <div>
              <label className="control-label" htmlFor="startDay">Start day:</label>
              <select className="form-control" id="startDay" ref="startDay">
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
              <label className="control-label" htmlFor="endDay">End day:</label>
              <select className="form-control" id="endDay" ref="endDay">
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>
          }
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start time:</label>
          <input className="form-control" id="startTime" ref="startTime" />
          <label htmlFor="endTime">End time:</label>
          <input className="form-control" id="endTime" ref="endTime" />
          <label htmlFor="timezone">Timezone:</label>
          <input className="form-control" id="timezone" ref="timezone" />
        </div>
        <div className="form-group">
          <button type="button" onClick={() => { this.props.onSubmitClick(this.buildSubmitClickArgument()); }} className="btn btn-default">{this.props.submitText}</button>
          {this.props.isSubmitting ? <span>SWOOSH</span> : ''}
          {this.props.submitError ? <p className="bg-danger">{this.props.submitError}</p> : ''}
        </div>
      </form>
    );
  },
});

export default ScheduleForm;
