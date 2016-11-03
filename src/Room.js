import React, {Component, PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Room extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Fetching room availability...</div>
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
      <Card style={{margin: '10px'}} key={room.number}>
        {this.renderRoomInfo(room)}
      </Card>
    );
  }

  renderRoomInfo(room) {
    return (
      <CardText>
        <h2
          style={{marginTop: 0}}
        >
          {room.name} {room.number}</h2>
        <div
          style={{
            float: 'left', background: (room.busy) ? '#FF482C' : '#3ABF78',
            height: 16,
            width: 16,
            borderRadius: 8,
            marginRight: 8
          }}
        >
        </div>
        <div>{room.busy ? 'Busy' : 'Available for ' + room.availableFor}</div>
      </CardText>
    )
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
      master
  }
}
`;

export default graphql(AvailableRoomsQuery, {
  options: ({params}) => ({variables: {roomId: params.roomNumber}}),
})(Room);
