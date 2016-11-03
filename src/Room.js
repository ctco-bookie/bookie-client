import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';

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

    const {data: {roomAvailabilityWithFloorOptions: rooms}} = this.props;

    document.title = rooms.filter(room => room.master)[0].name;

    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          rooms: rooms
        })}
      </div>
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
