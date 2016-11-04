import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';

class Room extends Component {
  render() {
    if (this.props.data.loading) {
      return <div className="progress-bar">
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
        {this.props.children && React.cloneElement(this.props.children, {
          rooms: availableRooms,
          masterRoom: floorMasterRoom
        })}
      </div>
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
