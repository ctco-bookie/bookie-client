import React, {Component} from 'react';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to bookie</h1>
        {this.props.children}
      </div>
    );
  }
}

export default App;
