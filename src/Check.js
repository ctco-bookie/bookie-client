import React, {Component, PropTypes} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {trackEvent, trackPageView} from './analytics';
import CircularProgress from 'material-ui/CircularProgress';

import './Check.css';

class Check extends Component {
  componentDidMount(){
    const room = this.props.masterRoom;
    trackPageView(`Scan QR/${room.floor} floor/${room.name} (${room.number})`);
  }

  render() {
    const {data: {roomsOnFloor}, masterRoom} = this.props;
    return (
      <div>
        <div>
          {this.renderRoomCard(masterRoom)}
        </div>
        {this.renderAvailableRooms(roomsOnFloor)}
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

  renderAvailableRooms(rooms) {
    let availableRooms = (rooms || []).filter(room => room.availability && !room.availability.busy)
                                      .sort((a, b) => a.number - b.number);

    return (
      <div>
        {(availableRooms.length) ?
          <div>
            <p className="list-title">Available rooms on this floor</p>
            {availableRooms.map(room => this.renderRoomCard(room))}
          </div>
          :
          <div className="progress-bar">
            <CircularProgress size={50} thickness={4}/>
            <p>Finding available rooms</p>
          </div>
        }
      </div>
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
      <FlatButton label={'Book ' + room.name} onClick={() => this.book(room)} primary={true} labelStyle={labelStyles} />
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

  book(room) {
    trackEvent('Proceed to Booking', `${room.name} (${room.number})`);
    hashHistory.push(`/room/${room.number}/book`)
  }
}

Check.propTypes = {
  data: PropTypes.shape({
    roomsOnFloor: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    roomNumber: PropTypes.string.isRequired
  }).isRequired,
};

const FloorRoomsQuery = gql`
  query AvailableRoomsQuery($roomNumber: Int!){
    roomsOnFloor: rooms(floorMasterRoomNumber: $roomNumber) {
      name
      number
      capacity
      floor
      availability {
        busy
        availableFor
        availableFrom
      }
    }
  }
`;

export default graphql(FloorRoomsQuery, {
  options: ({params}) => ({variables: {roomNumber: params.roomNumber}}),
})(Check);
