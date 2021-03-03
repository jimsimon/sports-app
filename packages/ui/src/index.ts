import { createApolloClient } from '@apollo-elements/lib/create-apollo-client';
import './components/theme-provider/theme-provider';
import './router/router';

const client = createApolloClient({
  uri: 'http://sports-app.docker/graphql',
  validateVariables: true,
});
window.__APOLLO_CLIENT__ = client;
