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
    this.fetchSecret();
  }

  async fetchSecret() {
    try {
      const {data: secret} = await axios.get(`${process.env.REACT_APP_BOOKIE_SERVER_URL}/secret`);
      this.setState({secret});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.secret ? this.renderSecret()
                           : <div>Fetching Bookie Server Super Secret...</div>}
      </div>
    );
  }

  renderSecret() {
    return (
      <div>Bookie Server Super Secret is <b>{this.state.secret}</b></div>
    );
  }
}

export default App;
