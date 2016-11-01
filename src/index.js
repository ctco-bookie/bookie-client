import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Room from './Room';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="room/:email" component={Room}/>
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
