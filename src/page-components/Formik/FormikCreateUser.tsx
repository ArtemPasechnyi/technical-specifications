import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { Button } from 'react-bootstrap';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { IUser } from '../../locaStorage';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
} from '../common/method';
import { ERoles } from '../exportConst';
import { validateArr, validateString } from './ErrorComponent';
import { SelectView } from './SelectView';

const roleOptions = [
  { value: ERoles.ANT, label: 'Ant' },
  { value: ERoles.ANT_MANAGER, label: 'Ant Manager' },
  { value: ERoles.ANT_OFFICER, label: 'Ant Officer' },
  { value: ERoles.DEVELOPER, label: 'Developer' },
];

const workBordersOptions = [
  { value: { id: 1, name: 'Белгатой' }, label: 'Белгатой' },
  { value: { id: 2, name: 'Шали' }, label: 'Шали' },
  { value: { id: 3, name: 'Урус-Мартан' }, label: 'Урус-Мартан' },
];

const errorComponent = (error: string | string[]) => {
  return <div className="invalid-feedback d-block">{error}</div>;
};

interface ICurrenUser {
  userId: number;
}

export const FormikCreateUser = () => {
  const { userId } = useLoaderData() as ICurrenUser;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });
  const currentUser = data?.getUserById;

  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const rout = useNavigate();
  const routToMainPage = () => {
    rout('/');
  };

  const clearUser: IUser = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    role: [ERoles.ANT],
    id: 1,
    workBorders: [],
  };

  const style = { maxWidth: '400px' }; //для контейнера

  const value: IUser = currentUser || clearUser;

  const currentUserId = currentUser?.id;

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Ошибка!!!</div>;
  }

  return (
    <>
      <Formik
        initialValues={value}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            currentUser
              ? updateUser({ variables: { values } })
              : createUser({ variables: { values } });
            routToMainPage();
            enqueueSnackbar(
              currentUser
                ? 'Профиль успешно обновлен'
                : 'Профиль успешно создан',
              {
                variant: 'success',
              }
            );
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, touched }) => (
          <div className="container" style={style}>
            <div className="col-sm-12">
              <h4>Форма создания юзера</h4>
            </div>
            <Form className="col-sm-12 d-flex flex-column gap-2">
              <div className="form-group">
                <Field
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  validate={(value: string) => validateString(value, 3)}
                />
                {errors.username &&
                  touched.username &&
                  errorComponent(errors.username as string)}
              </div>
              <div className="form-group">
                <Field
                  className="form-control"
                  type="text"
                  placeholder="Имя"
                  name="firstName"
                  validate={(value: string) => validateString(value, 2)}
                />
                {errors.firstName &&
                  touched.firstName &&
                  errorComponent(errors.firstName as string)}
              </div>
              <div className="form-group">
                <Field
                  className="form-control"
                  type="text"
                  placeholder="Фамилия"
                  name="lastName"
                />
              </div>
              <div className="form-group">
                <Field
                  className="custom-select"
                  name="role"
                  options={roleOptions}
                  component={SelectView}
                  placeholder="Роли"
                  isMulti={true}
                  defaultValue={roleOptions.filter((roleOption) =>
                    value.role.find((role: ERoles) => role === roleOption.value)
                  )}
                  validate={(value: string[]) => validateArr(value)}
                />
                {errors.role &&
                  touched.role &&
                  errorComponent(errors.role as string)}
              </div>
              <div className="form-group">
                <Field
                  className="custom-select"
                  name="workBorders"
                  options={workBordersOptions}
                  component={SelectView}
                  defaultValue={workBordersOptions.filter((workBordersOption) =>
                    value.workBorders.find(
                      (workBorder: any) =>
                        workBorder.id === workBordersOption.value.id
                    )
                  )}
                  placeholder="Место работы"
                  isMulti={true}
                  validate={(value: string[]) => validateArr(value)}
                />
                {errors.workBorders &&
                  touched.workBorders &&
                  errorComponent(errors.workBorders as string)}
              </div>

              <div className="form-group">
                <Field
                  className="form-control"
                  type="password"
                  placeholder="Пароль"
                  name="password"
                  validate={(value: string) => validateString(value, 4)}
                />
                {errors.password &&
                  touched.password &&
                  errorComponent(errors.password as string)}
              </div>

              <div className="form-group d-flex justify-content-between">
                <Button variant="outline-primary" type="submit" size="sm">
                  {currentUser ? 'Обновить' : 'Создать'}
                </Button>
                {currentUser && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      deleteUser({
                        variables: { userId: currentUserId },
                      });

                      routToMainPage();
                      enqueueSnackbar('Пользователь успешно удалён', {
                        variant: 'success',
                      });
                    }}
                  >
                    Удалить
                  </Button>
                )}
                <Link to={`/`} style={{ float: 'right' }}>
                  <Button variant="outline-primary" size="sm">
                    Вернуться к списку
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};
