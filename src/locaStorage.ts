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
  workBorders: EWorkBorders[];
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
  let userStorage: IUser[] = [];
  try {
    const stringifiedUsers = localStorage.getItem('userStorage');

    if (stringifiedUsers !== null) {
      userStorage = JSON.parse(stringifiedUsers);
    }
  } catch (e) {
    userStorage = [];
  }

  const userId = !userStorage.length ? 1 : userStorage[0].id + 1;

  user.id = userId;

  userStorage.unshift(user);

  localStorage.setItem('userStorage', JSON.stringify(userStorage, null, 2));
};
