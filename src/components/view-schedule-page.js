import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ViewSchedulePage = React.createClass({
  propTypes: {
    params: PropTypes.object,
    schedule: PropTypes.object,
  },

  render: function render() {
    return (
      <div className="row">
        <h3>View Schedule Page ({this.props.params.slug})</h3>
        <pre>{JSON.stringify(this.props.schedule)}</pre>
      </div>
    );
  },
});

const mapStateToProps = function mapDispatchToProps(state) {
  return {
    schedule: state.schedule,
  };
};

const ConnectedViewSchedulePage = connect(
  mapStateToProps,
  null
)(ViewSchedulePage);

export default ConnectedViewSchedulePage;
