import React, {Component} from 'react';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';

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
    const {data: roomInfo} = await axios.get(`${process.env.REACT_APP_BOOKIE_SERVER_URL}/calendar/${this.props.params.email.toLowerCase()}`);

    document.title = this.toCapitalCase(roomInfo.name);

    this.setState({roomInfo})
  }

  toCapitalCase(str) {
    return str.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    return <Card style={{ margin: '10px' }}>
      {this.state.roomInfo ? this.renderRoomInfo()
        : <div>Loading room info</div>}
    </Card>;
  }

  renderRoomInfo() {
    return (
      <CardText>
        <h2 style={{ marginTop: 0 }}>Room {this.toCapitalCase(this.state.roomInfo.name)}</h2>
        <div style={{ float: 'left', background: (this.state.roomInfo.busy) ? '#FF482C' : '#3ABF78', height: 16, width: 16, borderRadius: 8, marginRight: 8 }}></div>
        <div>Room is {this.state.roomInfo.busy ? 'Busy' : 'Available'}</div>
      </CardText>
    )
  }
}

export default Room;
