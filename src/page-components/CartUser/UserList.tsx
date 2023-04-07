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

  const handleClear = () => {
    localStorage.removeItem('userStorage');
    location.reload();
  };

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
      <div className="form-group d-flex justify-content-between">
        <Link to={`/form`}>
          <Button>Добавить нового пользователя</Button>
        </Link>
        <Button onClick={handleClear}>Удалить весь список</Button>
      </div>

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
