import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export default new ApolloClient({
  uri: 'http://api.sports-app.docker/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
    watchQuery: {
      errorPolicy: 'all',
    },
  },
});
