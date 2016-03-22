import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ParticipantsList = React.createClass({
  propTypes: {
    participants: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
    currentUser: PropTypes.string,

    onParticipantVisibilityChange: PropTypes.func,
    onParticipantImportanceChange: PropTypes.func,
  },

  isUserParticipant: function isUserParticipant(participant) {
    return participant.get('_id') === this.props.currentUser;
  },

  render: function render() {
    return (
      <ul className="participants-list">
        { this.props.participants.map((participant, ix) => {
          return (<li onClick={() => this.props.onParticipantVisibilityChange(participant)} key={participant.get('_id')} className={(ix % 2 ? 'stripe' : '')}>
            <span className="participant-name">{participant.get('name')}{this.isUserParticipant(participant) ? ' ⭐' : ''}</span>
          </li>);
        }) }
      </ul>
    );
  },
});

export default ParticipantsList;
