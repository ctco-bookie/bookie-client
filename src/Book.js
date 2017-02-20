import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import bookingOptions from './booking-options';
import { hashHistory } from 'react-router'
import './Book.css';
import CircularProgress from 'material-ui/CircularProgress';
import {trackEvent, trackPageView} from './analytics';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      result: null,
      selectedOption: bookingOptions[0],
      bookInProgress: false
    };

    this.book = this.book.bind(this);
    this.back = this.back.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  render() {
    if (this.state.bookInProgress) {
      return (
        <div className="progress-bar">
          <CircularProgress size={80} thickness={5}/>
          <p>Booking room now</p>
        </div>
      );
    }

    const {data: {room}} = this.props;

    return (
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: '#fff'}}>
        {this.renderContents(room)}
      </div>
    );
  }

  renderContents(room) {
    if (!this.state.result) {
      return this.renderForm(room);
    } else if (this.state.result.success) {
      return this.renderSuccess(room);
    } else {
      return this.renderFail(room);
    }
  }

  renderForm(room) {
    return (
      <Card style={{height: '100%'}}>
        <CardTitle title={`Book ${room.name} (${room.number}) for`}></CardTitle>
        <CardText>
          <RadioButtonGroup
            onChange={this.handleOptionChange}
            name="bookingOptions"
            defaultSelected={this.state.selectedOption}>
            {bookingOptions.map(option => {
              return (
                <RadioButton
                  key={option.duration}
                  value={option}
                  label={option.label}
                  style={{marginBottom: '20px', fontSize: '16px'}}
                />
              );
            })}
          </RadioButtonGroup>
          <RaisedButton style={{marginTop: '20px'}}
            label="Book Now"
            primary={true}
            fullWidth={true}
            onClick={this.book}
          />
          {this.renderBackButton(room)}
        </CardText>
      </Card>
    );
  }

  renderSuccess(room) {
    trackPageView("Booking Result/Success");
    return (
      <div className="book-success">
        <div className="book-success-icon"></div>
        <p>{this.state.result.message}</p>
        {this.renderBackButton(room)}
      </div>
    );
  }

  renderFail(room) {
    trackPageView("Booking Result/Busy");
    return (
      <div className="book-fail">
        <div className="book-fail-icon"></div>
        <p>{this.state.result.message}</p>
        {this.renderBackButton(room)}
      </div>
    );
  }

  renderBackButton(room) {
    return <RaisedButton style={{marginTop: '20px'}}
                         label="Back to Room List"
                         fullWidth={true}
                         onClick={() => this.back(room)}
    />
  }

  back(room) {
    hashHistory.push(`/room/${room.number}/check`);
    window.location.reload(true);
  }

  async book() {
    trackEvent('Book Room', this.state.selectedOption.label);
    this.setState({bookInProgress: true});
    const {data: {bookRoom}} = await this.props.bookRoom(this.props, this.state.selectedOption);
    this.setState({result: bookRoom, bookInProgress: false});
  }

  handleOptionChange(_, selectedOption) {
    this.setState({selectedOption});
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
  query RoomQuery($roomNumber: Int!){
    room(roomNumber: $roomNumber) {
      name
      number
  }
}
`;

const BookMutation = gql`
  mutation BookMutation($roomNumber: Int!, $bookForMinutes: Int!){
    bookRoom(roomNumber: $roomNumber, bookForMinutes: $bookForMinutes) {
      success
      message
    }
  }
`;

const withQueries = graphql(RoomQuery, {
  options: ({params}) => ({variables: {roomNumber: params.roomNumber}}),
});

const withMutations = graphql(BookMutation, {
  props: ({mutate}) => ({
    bookRoom: ({params}, selectedOption) => mutate({
      variables: {
        roomNumber: params.roomNumber,
        bookForMinutes: selectedOption.duration
      }
    })
  })
})

export default withMutations(withQueries(Book));
