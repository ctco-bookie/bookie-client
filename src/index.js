import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import history from './history';
import App from './App';
import Room from './Room';
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
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="room/:roomNumber/" component={Room}>
          <Route path="check" component={Check} />
          <Route path="book" component={Book} />
        </Route>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
