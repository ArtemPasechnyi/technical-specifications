import { ApolloClient, InMemoryCache } from '@apollo/client';
import { IUser } from '../CartUser/CartItem';
import { GET_ALL_USERS } from './method';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      createUser: (_, variables, { cache }) => {
        const { user } = variables;
        const query = GET_ALL_USERS;
        const { users } = cache.readQuery({ query });
        user.id = !users.length ? 1 : users[0].id + 1;
        const data = { users: [user, ...users] };

        cache.writeQuery({ query, data });

        return data;
      },

      deleteUser: (_, variables, { cache }) => {
        const { id } = variables;
        const query = GET_ALL_USERS;
        const { users } = cache.readQuery({ query });
        const userIndex = users.findIndex((user: IUser) => user.id === id);
        const newUsers = [...users];
        newUsers.splice(userIndex, 1);
        const data = { users: [...newUsers] };

        cache.writeQuery({ query, data });

        return data;
      },

      updateUser: (_, variables, { cache }) => {
        const { user } = variables;
        const { id } = user;
        const query = GET_ALL_USERS;
        const { users } = cache.readQuery({ query });
        const newUsers = [...users];
        const userIndex = users.findIndex((user: IUser) => user.id === id);
        newUsers[userIndex] = user;

        const data = { users: [...newUsers] };

        cache.writeQuery({ query, data });

        return data;
      },
    },
    Query: {
      getUserById: (_, variables, { cache }) => {
        const { id } = variables;
        const query = GET_ALL_USERS;
        const { users } = cache.readQuery({ query });
        const userIndex = users.findIndex((user: IUser) => user.id === id);

        return users[userIndex];
      },
    },
  },
});
