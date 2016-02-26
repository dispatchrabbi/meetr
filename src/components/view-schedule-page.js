import React, { PropTypes } from 'react';

const CreateSchedulePage = React.createClass({
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

export default CreateSchedulePage;
