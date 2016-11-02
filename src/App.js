import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Bookie" showMenuIconButton={false} style={{ textAlign: 'center', background: '#673AB7' }} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
