import { Key, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { Search } from './Search';
import styles from './Cart.module.css';
import { gql, useQuery } from '@apollo/client';
import { IUser } from '../../locaStorage';

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      firstName
      userName
      lastName
    }
  }
`;

export const UserList = () => {
  const { data } = useQuery(GET_ALL_USERS);
  const [query, setQuery] = useState<string>('');
  const searchUsers = data.users.filter((value: any) =>
    value.firstName.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleClear = () => {
    data.users.length = 0;
    location.reload();
  };

  return !data.users.length ? (
    <div className={styles.root}>
      <h2 className={styles.item}>Список пользователей пустой</h2>
      <h4 className={styles.item}>Хотите добавить?</h4>
      <Link to={`/form`} className={styles.item}>
        <Button>Добавить нового пользователя</Button>
      </Link>
    </div>
  ) : (
    <div className={styles.listRoot}>
      <div className="form-group d-flex justify-content-between">
        <Link to={`/form`}>
          <Button>Добавить нового пользователя</Button>
        </Link>
        <Button onClick={handleClear}>Удалить весь список</Button>
      </div>

      <hr />
      <Search setQuery={setQuery} query={query} />
      <div className="row justify-content-start pt-2 margin-20">
        {searchUsers.map((user: IUser, index: Key | null | undefined) => {
          return <CartItem user={user} key={index} />;
        })}
      </div>
    </div>
  );
};
