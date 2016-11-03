import React, {Component, PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';

import './Room.css';

class Room extends Component {
  render() {
    if (this.props.data.loading) {
      return <div style={{
        textAlign: 'center',
        fontSize: '20px',
        marginTop: '30px'
      }}>
        <CircularProgress size={80} thickness={5} />
        <p>Checking room availability</p>
      </div>
    }

    const {data: {floorMasterRoom}} = this.props;
    const {data: {roomsOnMasterFloor}} = this.props;

    const availableRooms = roomsOnMasterFloor.filter(room => !room.busy)
                                           .sort((a, b) => a.number - b.number);

    floorMasterRoom.master = true;

    document.title = floorMasterRoom.name;

    return (
      <div>
        <div style={{padding: '4px 16px 0 16px'}}>
          {this.renderRoomCard(floorMasterRoom)}
        </div>

        <List>
          <p className="list-title">Available rooms on this floor</p>

          {availableRooms.map(room =>
            <ListItem key={room.number}>
              {this.renderRoomCard(room)}
            </ListItem>
          )}
        </List>
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
            <p className="availability">{room.availability.busy ? 'busy till ' + room.availability.availableFrom : 'available ' + room.availability.availableFor}</p>
          </div>
        </CardText>
      </Card>
    );
  }
}

Room.propTypes = {
  data: PropTypes.shape({
    floorMasterRoom: PropTypes.object,
    roomsOnMasterFloor: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    roomNumber: PropTypes.string.isRequired
  }).isRequired,
};

const AvailableRoomsQuery = gql`
  query AvailableRoomsQuery($roomNumber: Int!){
    floorMasterRoom: room(roomNumber: $roomNumber) {
      ...roomWithAvailability
    }
    roomsOnMasterFloor: rooms(floorMasterRoomNumber: $roomNumber) {
      ...roomWithAvailability
    }
  }
  
  fragment roomWithAvailability on Room {
    name
    number
    capacity
    availability {
      busy
      availableFor
      availableFrom
    }
  }
`;

export default graphql(AvailableRoomsQuery, {
  options: ({params}) => ({variables: {roomNumber: params.roomNumber}}),
})(Room);
