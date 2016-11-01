import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

class App extends Component {

  render() {
    return (
      <div>
        <AppBar title="Bookie" showMenuIconButton={false} titleStyle={{ textAlign: 'center' }} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
