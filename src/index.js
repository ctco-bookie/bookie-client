import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Room from './Room';
import './index.css';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri: `${process.env.REACT_APP_BOOKIE_SERVER_URL}/graphql`}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="room/:roomNumber" component={Room}/>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
