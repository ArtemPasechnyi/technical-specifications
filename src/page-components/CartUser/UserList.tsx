import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserStorage } from '../../locaStorage';
import { CartItem } from './CartItem';
import { Search } from './Search';
import styles from './Cart.module.css';

export const UserList = () => {
  const users = getUserStorage();
  const [query, setQuery] = useState<string>('');
  const searchUsers = users.filter((value) =>
    value.firstName.toLowerCase().startsWith(query.toLowerCase())
  );

  return !users.length ? (
    <div className={styles.root}>
      <h2 className={styles.item}>Список пользователей пустой</h2>
      <h4 className={styles.item}>Хотите добавить?</h4>
      <Link to={`/form`} className={styles.item}>
        <Button>Добавить нового пользователя</Button>
      </Link>
    </div>
  ) : (
    <div className={styles.listRoot}>
      <Search setQuery={setQuery} query={query} />
      {searchUsers.map((user, index) => {
        return <CartItem user={user} key={index} />;
      })}
      <Link to={`/form`}>
        <Button>Добавить нового пользователя</Button>
      </Link>
    </div>
  );
};
