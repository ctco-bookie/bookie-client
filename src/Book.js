import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';

class Book extends Component {
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

    const {data: {roomAvailability: room}} = this.props;

    return (
      <div>{room.name}</div>
    );
  }
}

Book.propTypes = {
  data: PropTypes.shape({
    roomAvailability: PropTypes.object,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    roomNumber: PropTypes.string.isRequired
  }).isRequired,
};

const RoomQuery = gql`
  query RoomQuery($roomId: Int!){
    roomAvailability(roomId: $roomId) {
      name
      number
  }
}
`;

export default graphql(RoomQuery, {
  options: ({params}) => ({variables: {roomId: params.roomNumber}}),
})(Book);
