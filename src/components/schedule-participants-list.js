import { connect } from 'react-redux';

import ParticipantsList from './participants-list.js';

const mapStateToProps = function mapStateToProps(state) {
  return {
    participants: state.participants,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onParticipantVisibilityChange: function onParticipantVisibilityChangeLog(participant) {
      console.log(`Visibility changed for ${participant.name}.`);
    },
    onParticipantImportanceChange: null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsList);
