import Card from 'react-bootstrap/Card';
import { IUser } from '../../locaStorage';

interface ICartUser {
  user: IUser;
}

export const CartItem = (props: ICartUser) => {
  const { user } = props;
  const { firstName, lastName, username, id } = user;

  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>Карточка юзера №{id}</Card.Title>
        <Card.Text>
          <strong>Username: </strong>
          {username}
        </Card.Text>
        <Card.Text>
          <strong>Имя: </strong>
          {firstName}
        </Card.Text>
        <Card.Text>
          <strong>Фамилия: </strong>
          {lastName}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
