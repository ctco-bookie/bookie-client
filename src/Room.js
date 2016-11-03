import React, {Component, PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
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
        <p>Loading room availability</p>
      </div>
    }

    const {data: {roomAvailabilityWithFloorOptions: rooms}} = this.props;

    document.title = rooms.filter(room => room.master)[0].name;

    return (
      <div>
        <div>
          {rooms.filter(room => room.master).map(room => this.renderRoomCard(room))}
        </div>
        <div
          style={{marginTop: '40px'}}
        >
          {rooms.filter(room => !room.master).map(room => this.renderRoomCard(room))}
        </div>
      </div>
    );
  }

  renderRoomCard(room) {
    return (
      <Card key={room.number} className={'room-card'}
            style={room.master ? { background: (room.busy) ? '#FF482C' : '#3ABF78' } : {}}
      >
        <CardText>
          <div className={'room ' + (room.master ? 'room-master' : '') + (!room.busy && room.master ? ' room-master-available' : '')}>
            <h2 className="title">{room.name} ({room.number})</h2>
            <div className={'indicator ' + (room.busy ? 'busy' : 'available')}></div>
            <p>{room.busy ? 'Busy till ' + room.availableFrom : 'Available for ' + room.availableFor}</p>
          </div>
        </CardText>
      </Card>
    );
  }
}

Room.propTypes = {
  data: PropTypes.shape({
    roomAvailabilityWithFloorOptions: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    roomNumber: PropTypes.string.isRequired
  }).isRequired,
};

const AvailableRoomsQuery = gql`
  query AvailableRoomsQuery($roomId: Int!){
    roomAvailabilityWithFloorOptions(roomId: $roomId) {
      name
      number
      busy
      availableFor
      availableFrom
      master
  }
}
`;

export default graphql(AvailableRoomsQuery, {
  options: ({params}) => ({variables: {roomId: params.roomNumber}}),
})(Room);
