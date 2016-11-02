import React, {Component} from 'react';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';

class Room extends Component {
  constructor() {
    super();

    this.state = {
      rooms: []
    };

  }

  componentWillMount() {
    this.loadRoomInfo();
  }

  async loadRoomInfo() {
      const {data: rooms} = await axios.get(`${process.env.REACT_APP_BOOKIE_SERVER_URL}/calendars/${this.props.params.number}`);

      document.title = this.findMaster(rooms).name;
      this.setState({rooms})
  }

  findMaster(rooms) {
      return rooms && rooms.find(room => room.master);
  }

  render() {
      if (!this.state.rooms.length) {
          return <div>Loading room info</div>
      }

      return (
          <div>
              <div>
                  {this.state.rooms.filter(room => room.master).map(room => this.renderRoomCard(room))}
              </div>
              <div style={{ marginTop: '40px' }}>
                  {this.state.rooms.filter(room => !room.master).map(room => this.renderRoomCard(room))}
              </div>
          </div>
      )
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
        <h2 style={{ marginTop: 0 }}>{room.name}</h2>
        <div style={{ float: 'left', background: (room.busy) ? '#FF482C' : '#3ABF78', height: 16, width: 16, borderRadius: 8, marginRight: 8 }}></div>
        <div>{room.busy ? 'Busy' : 'Available for ' + room.availableFor}</div>
      </CardText>
    )
  }
}

export default Room;
