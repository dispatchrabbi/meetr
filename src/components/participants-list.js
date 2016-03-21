import React, { PropTypes } from 'react';

const ParticipantsList = React.createClass({
  propTypes: {
    participants: PropTypes.arrayOf(PropTypes.object),
    userParticipant: PropTypes.object,

    onParticipantVisibilityChange: PropTypes.func,
    onParticipantImportanceChange: PropTypes.func,
  },

  isUserParticipant: function isUserParticipant(participant) {
    return this.props.userParticipant && this.props.userParticipant._id === participant._id;
  },

  render: function render() {
    return (
      <ul className="participants-list">
        { this.props.participants.map((participant, ix) => {
          return (<li onClick={() => this.props.onParticipantVisibilityChange(participant)} key={participant._id} className={(ix % 2 ? 'stripe' : '')}>
            <span className="participant-name">{participant.name}{this.isUserParticipant(participant) ? ' *' : ''}</span>
          </li>);
        }) }
      </ul>
    );
  },
});

export default ParticipantsList;
