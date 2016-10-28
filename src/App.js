import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        Bookie secret is <b>{process.env.REACT_APP_BOOKIE_SECRET}</b>
      </div>
    );
  }
}

export default App;
