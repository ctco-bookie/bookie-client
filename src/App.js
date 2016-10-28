import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    this.state = {
      secret: null
    }
  }

  componentWillMount() {
    axios.get(`${process.env.REACT_APP_BOOKIE_SERVER_URL}/secret`)
      .then(response => {
        console.log(response);
        this.setState({
          secret: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.secret ? this.renderSecret()
                           : <div>'Fetching Bookie Server Secret...'</div>}
      </div>
    );
  }

  renderSecret() {
    return (
      <div>Bookie Server Super Secret is <b>{this.state.secret}</b></div>
    )
  }
}

export default App;
