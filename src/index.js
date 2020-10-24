import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import * as serviceWorker from './serviceWorker';
import App from './App';
import commonConstant from './common/commonConstant';

const httpLink = new HttpLink({
  uri: commonConstant.envBackendAPI,
});

const wsLink = new WebSocketLink({
  uri: commonConstant.envsockerAPI,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  // splitLink,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
