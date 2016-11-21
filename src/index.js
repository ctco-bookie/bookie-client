import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Book from './Book';
import Check from './Check';
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
        <Route path="room/:roomNumber/check" component={Check} />
        <Route path="room/:roomNumber/book" component={Book} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
