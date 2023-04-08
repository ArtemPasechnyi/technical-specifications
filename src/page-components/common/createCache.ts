import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();
export const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      // createUser
      // updateUser
      // deleteUser
    },
    Query: {
      // getUserById
    },
  },
});
