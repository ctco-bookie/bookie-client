import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import history from './history';

class RoomPicker extends Component {
  constructor(props) {
      super(props);
      this.state = {room: undefined};
  }

  render() {
    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Card style={{height: 200, width: '80%'}}>
          <CardTitle title="Welcome to Bookie"/>
          <CardText style={{textAlign: 'center'}}>
            <TextField hintText="Room number" onChange={this.roomChange} />
            <RaisedButton primary={true} style={{marginTop: 10}} onClick={this.book}>Book</RaisedButton>
          </CardText>
        </Card>
      </div>
    );
  }

  roomChange = (event, room) => {
    this.setState({
        room
    });
  }

  book = (event, room) => {
    history.push(`/room/${this.state.room}/book`)
  }
}

export default RoomPicker;