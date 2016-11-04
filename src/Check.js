import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import capacityIcon from './svg/capacity.svg';
import capacityIconMaster from './svg/capacityMaster.svg';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'

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
            <img
              className="icon"
              src={room.master ? capacityIconMaster : capacityIcon}
              alt="capacityIcon"
            />
          </div>
        </CardText>
        {!room.availability.busy ? this.renderCardActions(room) : ''}
      </Card>
    );
  }

  renderCardActions(room) {
    let actionStyles;
    let labelStyles = {
      fontWeight: 'bold'
    };
    if (room.master) {
      actionStyles = {
        borderTop: '1px solid rgba(255,255,255,0.24)'
      };
      labelStyles.color = '#fff';
    }
    else {
      actionStyles = {
        borderTop: '1px solid rgba(0,0,0,0.12)'
      };
    }
    return <CardActions style={actionStyles}>
      <FlatButton label={'Book ' + room.name} onClick={() => this.book(room.number)} primary={true} labelStyle={labelStyles} />
    </CardActions>
  }

  book(roomId) {
    browserHistory.push(`/room/${roomId}/book`)
  }
}

export default Check;
