import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import {Link} from 'react-router';

import './Check.css';

class Check extends Component {
  render() {
    const {rooms, masterRoom} = this.props;

    return (
      <div>
        <div>
          {this.renderRoomCard(masterRoom)}
        </div>
        <div
          style={{marginTop: '40px'}}
        >
          {rooms.map(room => this.renderRoomCard(room))}
        </div>
      </div>
    );
  }

  renderRoomCard(room) {
    return (
      <Card key={room.number} className={'room-card'}
            style={room.master ? { background: (room.availability.busy) ? '#FF482C' : '#3ABF78' } : {}}
      >
        <CardText>
          <div className={'room ' + (room.master ? 'room-master' : '') + (!room.availability.busy && room.master ? ' room-master-available' : '')}>
            <h2 className="title">{room.name} ({room.number})</h2>
            <div className={'indicator ' + (room.availability.busy ? 'busy' : 'available')}></div>
            <p>{room.availability.busy ? 'Busy till ' + room.availability.availableFrom : 'Available for ' + room.availability.availableFor}</p>
          </div>
        </CardText>
        <CardActions>
          <Link to={`/room/${room.number}/book`}>book</Link>
        </CardActions>
      </Card>
    );
  }
}

export default Check;
