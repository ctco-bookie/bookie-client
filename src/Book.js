import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      result: null
    };
    this.book = this.book.bind(this);
  }

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

    if (!this.state.result) {
      return this.renderForm(room);
    } else if (this.state.result.success) {
      return this.renderSuccess();
    } else {
      return this.renderFail();
    }
  }

  renderForm(room) {
    return (
      <div>
        {room.name} ({room.number})
        <button onClick={this.book}>Book now</button>
      </div>
    );
  }

  renderSuccess() {
    return (
      <div>Success: {this.state.result.message}</div>
    );
  }

  renderFail() {
    return (
      <div>Fail: {this.state.result.message}</div>
    );
  }

  async book() {
    const {data: {bookRoom}} = await this.props.bookRoom(this.props);
    //TODO investigate possibility to move to props
    this.setState({result: bookRoom});
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
  bookRoom: PropTypes.func.isRequired
};

const RoomQuery = gql`
  query RoomQuery($roomId: Int!){
    roomAvailability(roomId: $roomId) {
      name
      number
  }
}
`;

const BookMutation = gql`
  mutation BookMutation($roomId: Int!){
    bookRoom(roomId: $roomId) {
      success
      message
    }
  }
`;

const withQueries = graphql(RoomQuery, {
  options: ({params}) => ({variables: {roomId: params.roomNumber}}),
});

const withMutations = graphql(BookMutation, {
  props: ({mutate}) => ({
    bookRoom: ({params}) => mutate({variables: {roomId: params.roomNumber}})
  })
});

export default withMutations(withQueries(Book));
