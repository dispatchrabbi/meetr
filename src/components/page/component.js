import React from 'react';
import ParticipantList from '../participant-list/component.js';
import TimeGrid from '../time-grid/component.js';

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const statusLabels = [
      { text: 'Available', className: 'available' },
      { text: 'Prefer Not', className: 'prefernot' },
      { text: 'Unavailable', className: 'unavailable' },
    ];

    return (
      <div className="container">
        <div className="page-header">
          <h1>Meetr <small>Like when2jeremy, but with more.</small></h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <ParticipantList title={'Yep'} participants={['A', 'B']} />
              </div>
              <div className="col-md-6">
              <ParticipantList title={'Nope'} participants={['C', 'D']} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="status-labels">
              {statusLabels.map((status) => {
                return <span key={status.text} className={['label', 'label-default', status.className].join(' ')}>{status.text}</span>;
              })}
            </h3>
            <TimeGrid />
          </div>
        </div>
      </div>
    );
  }
}
