import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CreateScheduleForm from './create-schedule-form.js';

const App = React.createClass({
  propTypes: {
    schedule: PropTypes.object,
  },

  render: function render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Meetr <small>Like when2jeremy, but with more.</small></h1>
        </div>
        {
          this.props.schedule ?
            <div>
              <h2>Schedule exists!</h2>
              <pre>{JSON.stringify(this.props.schedule)}</pre>
            </div>
          :
            <CreateScheduleForm />
        }
      </div>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
};

const ConnectedApp = connect(
  mapStateToProps,
  null
)(App);

export default ConnectedApp;
