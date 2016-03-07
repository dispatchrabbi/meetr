import React, { PropTypes } from 'react';

const ParticipantsList = React.createClass({
  propTypes: {
    participants: PropTypes.arrayOf(PropTypes.object),

    onParticipantVisibilityChange: PropTypes.func,
    onParticipantImportanceChange: PropTypes.func,
  },

  render: function render() {
    return (
      <ul className="list-group">
        { this.props.participants.map((participant, ix) => {
          return (<li onClick={() => this.props.onParticipantVisibilityChange(participant)} key={participant._id} className={'list-group-item' + (ix % 2 ? ' list-group-item-warning' : '')}>
            <span className="participant-name">{participant.name}</span>
          </li>);
        }) }
      </ul>
    );
  },
});

export default ParticipantsList;
