import { FormikErrors } from 'formik';
import {
  ERoles,
  EWorkBorders,
} from './page-components/Formik/FormikCreateUser';

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ERoles[];
  workBorders:
    | EWorkBorders[]
    | FormikErrors<EWorkBorders>[]
    | string
    | string[];
  id: number;
}

export const getUserStorage = () => {
  let userStorage: IUser[] = [];
  try {
    const stringifiedUsers = localStorage.getItem('userStorage');

    if (stringifiedUsers !== null) {
      userStorage = JSON.parse(stringifiedUsers);
    }
  } catch (e) {
    userStorage = [];
  }

  return userStorage;
};

export const createUserStorage = (user: IUser) => {
  const userStorage = getUserStorage();
  const id = !userStorage.length ? 1 : userStorage[0].id + 1;
  user.id = id;

  userStorage.unshift(user);

  localStorage.setItem('userStorage', JSON.stringify(userStorage, null, 2));
};

export const getUserById = (id: number) => {
  const allUsers = getUserStorage();

  return allUsers.find((value) => value.id === id);
};

export const deleteUser = (id: number) => {
  const userStorage = getUserStorage();
  const userIndex = userStorage.findIndex((user) => user.id === id);

  userStorage.splice(userIndex, 1);

  localStorage.setItem('userStorage', JSON.stringify(userStorage, null, 2));
};

export const updateUser = (user: IUser) => {
  const { id } = user;
  const userStorage = getUserStorage();

  const userIndex = userStorage.findIndex((user) => user.id === id);

  userStorage[userIndex] = user;

  localStorage.setItem('userStorage', JSON.stringify(userStorage, null, 2));
};
