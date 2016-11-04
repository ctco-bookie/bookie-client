import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
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
        <div>
          <p className="list-title">Available rooms on this floor</p>
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
            { !room.availability.busy ? this.renderRoomInfo(room) :  <div>{this.renderTimeStatus(room)}</div>}
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

  renderRoomInfo(room) {
    return (
      <div>
        <div className="info" >
          <div className={'info-icon ' + (room.master ? 'info-icon-master info-icon-capacity-master' : 'info-icon-capacity')}></div>
          <div>{room.capacity}</div>
        </div>
        <div className="info">
          <div className={'info-icon ' + (room.master ? 'info-icon-master info-icon-time-master' : '')}>
          {(!room.master
            ? <div className={'indicator ' + (room.availability.busy ? 'busy' : 'available')}></div>
            : <div className={'info-icon info-icon-time ' + (room.master ? 'info-icon-master' : '')}></div>
          )}
          </div>
          <div>{this.renderTimeStatus(room)}</div>
        </div>
      </div>
    );
  }

  renderTimeStatus(room) {
    return room.availability.busy ? 'busy till ' + room.availability.availableFrom : 'available ' + room.availability.availableFor;
  }

  book(roomId) {
    browserHistory.push(`/room/${roomId}/book`)
  }
}

export default Check;
