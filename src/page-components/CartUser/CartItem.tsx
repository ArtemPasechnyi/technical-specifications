import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { ERoles, IWorkBorders } from '../exportConst';

export interface IUser {
  userName: string;
  password: string;
  firstName: string;
  lastName?: string;
  roles: ERoles[];
  workBorders: IWorkBorders[];
  id: number;
}
interface ICartItemProps {
  user: IUser;
}

export const CartItem = (props: ICartItemProps) => {
  const { user } = props;
  const { firstName, lastName, userName, id } = user;

  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>Карточка юзера №{id}</Card.Title>
        <hr />
        <Card.Text>
          <strong>Username: </strong>
          {userName}
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

        <Link to={`/form?id=${id}`}>
          <Button variant="outline-primary" size="sm">
            Обновить
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
