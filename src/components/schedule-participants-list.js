import _ from 'lodash';
import { connect } from 'react-redux';

import ParticipantsList from './participants-list.js';

const mapStateToProps = function mapStateToProps(state) {
  return {
    participants: state.participants,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onParticipantVisibilityChange: _.noop,
    onParticipantImportanceChange: _.noop,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsList);
