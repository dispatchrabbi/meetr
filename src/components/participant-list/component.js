import React from 'react';

export default class ParticipantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ul className="list-unstyled participant-list">
          {this.props.participants.map((participant) => {
            return <li key={participant}>{participant}</li>;
          })}
        </ul>
      </div>
    );
  }
}

ParticipantList.propTypes = {
  title: React.PropTypes.string,
  participants: React.PropTypes.array,
};
