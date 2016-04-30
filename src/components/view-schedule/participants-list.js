import _ from 'lodash';
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

export const ParticipantsList = React.createClass({
  propTypes: {
    participants: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
    currentUser: PropTypes.string,

    className: PropTypes.string,

    onParticipantVisibilityChange: PropTypes.func.isRequired,
    onParticipantImportanceChange: PropTypes.func.isRequired,
  },

  isUserParticipant: function isUserParticipant(participant) {
    return participant.get('_id') === this.props.currentUser;
  },

  render: function render() {
    return (
      <ul className={'participants-list ' + (this.props.className || '')}>
        { this.props.participants.map((participant, ix) => {
          return (<li onClick={() => this.props.onParticipantVisibilityChange(participant)} key={participant.get('_id')} className={(ix % 2 ? 'stripe' : '')}>
            <span className="participant-name">{participant.get('name')}{this.isUserParticipant(participant) ? ' ⭐' : ''}</span>
          </li>);
        }) }
      </ul>
    );
  },
});

const mapStateToProps = function mapStateToProps(state) {
  return {
    participants: state.getIn(['currentSchedule', 'participants', 'list']),
    currentUser: state.get('currentUser'),
  };
};

const mapDispatchToProps = function mapDispatchToProps(/* dispatch */) {
  return {
    onParticipantVisibilityChange: _.noop,
    onParticipantImportanceChange: _.noop,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantsList);
