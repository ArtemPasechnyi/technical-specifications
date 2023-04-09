import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { IUser } from '../../locaStorage';

interface ICartItemProps {
  user: IUser;
}

export const CartItem = (props: ICartItemProps) => {
  const { user } = props;
  const { firstName, lastName, username, id } = user;

  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>Карточка юзера №{id}</Card.Title>
        <hr />
        <Card.Text>
          <strong>Username: </strong>
          {username}
        </Card.Text>
        <Card.Text>
          <strong>Имя: </strong>
          {firstName}
        </Card.Text>
        {lastName && (
          <Card.Text>
            <strong>Фамилия: </strong>
            {lastName}
          </Card.Text>
        )}

        <Link to={`/form?id=${id}`} style={{ float: 'right' }}>
          <Button variant="outline-primary" size="sm">
            Обновить
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
