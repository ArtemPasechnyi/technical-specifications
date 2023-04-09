import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { Search } from './Search';
import styles from './Cart.module.css';
import { gql, useQuery } from '@apollo/client';
import { IUser } from '../common/createCache';

const GET_ALL_USERS = gql`
  query getAllUsers {
    users @client {
      id
      firstName
      userName
      lastName
    }
  }
`;

export const UserList = () => {
  const { data } = useQuery(GET_ALL_USERS);
  const { users } = data;
  const [query, setQuery] = useState<string>('');
  const searchUsers = (users as IUser[]).filter((value: any) =>
    value.firstName.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div className={styles.listRoot}>
      <Link to={`/form`}>
        <Button>Добавить нового пользователя</Button>
      </Link>

      <hr />
      <Search setQuery={setQuery} query={query} />
      <div className="row justify-content-start pt-2 margin-20">
        {searchUsers.map((user, index) => {
          return <CartItem user={user} key={index} />;
        })}
      </div>
    </div>
  );
};
