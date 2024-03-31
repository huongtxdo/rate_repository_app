import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.expoConfig.extra.apollo_uri,
    cache: new InMemoryCache(),
  });
};
//the uri's IP address is the same as the one we use to fetch data in hooks/useRepositories.js
// the differences are port (4000) and path (/graphql)

export default createApolloClient;

