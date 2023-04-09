import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($user: [IUser]) {
    createUser(user: $user) @client
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: [IUser]) {
    updateUser(user: $user) @client
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(id: $userId) @client
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: Int!) {
    getUserById(id: $userId) @client {
      id
      firstName
      userName
      lastName
      roles
      workBorders
      password
    }
  }
`;
