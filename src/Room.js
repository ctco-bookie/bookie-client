import React, {Component} from 'react';
import axios from 'axios';

class Room extends Component {
  constructor() {
    super();

    this.state = {
      roomInfo: null
    };
  }

  componentWillMount() {
    this.loadRoomInfo();
  }

  async loadRoomInfo() {
    const response =  await axios.get(`${process.env.REACT_APP_BOOKIE_SERVER_URL}/calendar/${this.props.params.email.toLowerCase()}`);
    this.setState({
      roomInfo: response.data
    })
  }

  render() {
    return <div>
      {this.state.roomInfo ? this.renderRoomInfo()
        : <div>Loading room info</div>}
    </div>;
  }

  renderRoomInfo() {
    return (
      <section>
        <h2>Room {this.state.roomInfo.name}</h2>
        <div>Room is {this.state.roomInfo.busy ? 'Busy' : 'Available'}</div>
      </section>
    )
  }
}

export default Room;
