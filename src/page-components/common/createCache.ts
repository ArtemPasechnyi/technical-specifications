import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ERoles, IWorkBorders } from '../exportConst';
import { GET_ALL_USERS } from './method';

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ERoles[];
  workBorders: IWorkBorders[];
  id: number;
}

const cache = new InMemoryCache();
export const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      createUser: (variables, { cache }) => {
        const { user } = variables;
        const { users } = cache.readQuery({ GET_ALL_USERS });
        user.id = !users.length ? 1 : users[0]?.id;

        cache.writeQuery({ GET_ALL_USERS, users: [user, ...users] });

        return null;
      },
      deleteUser: (variables, { cache }) => {
        const { id } = variables;
        const { users } = cache.readQuery({ GET_ALL_USERS });
        const userIndex = users.findIndex((user: IUser) => user.id === id);

        const newUsers = [...users];

        newUsers.splice(userIndex, 1);

        cache.writeQuery({ GET_ALL_USERS, users: [...newUsers] });

        return null;
      },
      updateUser: (variables, { cache }) => {
        const { user } = variables;
        const { id } = user;
        const { users } = cache.readQuery({ GET_ALL_USERS });

        const newUsers = [...users];

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        newUsers[userIndex] = user;

        cache.writeQuery({ GET_ALL_USERS, users: [...newUsers] });

        return null;
      },
    },
    Query: {
      getUserById: (variables, { cache }) => {
        const { id } = variables;
        const { users } = cache.readQuery({ GET_ALL_USERS });
        const userIndex = users.findIndex((user: IUser) => user.id === id);

        return users[userIndex];
      },
    },
  },
});
