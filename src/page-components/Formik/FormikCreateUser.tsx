import { Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MultiSelect from 'react-select';
import { createUserStorage } from '../../locaStorage';
import styles from './Formik.module.css';

export enum ERoles {
  ANT = 'ant',
  ANT_MANAGER = 'antManager',
  ANT_OFFICER = 'antOfficer',
  DEVELOPER = 'developer',
}

const roleOptions = [
  { value: ERoles.ANT, label: 'Ant' },
  { value: ERoles.ANT_MANAGER, label: 'Ant Manager' },
  { value: ERoles.ANT_OFFICER, label: 'Ant Officer' },
  { value: ERoles.DEVELOPER, label: 'Developer' },
];

export interface EWorkBorders {
  id: string;
  name: string;
}

const workBordersOptions = [
  { value: { id: 1, name: 'Белгатой' }, label: 'Белгатой' },
  { value: { id: 2, name: 'Шали' }, label: 'Шали' },
  { value: { id: 3, name: 'Урус-Мартан' }, label: 'Урус-Мартан' },
];

const validateString = (value: string, count: number) => {
  let error;
  switch (true) {
    case !value:
      error = 'Обязательное поле';
      break;
    case value.length < count:
      error = `Минимальное ко-во символов ${count}`;
      break;
  }

  return error;
};

// const validateArr = (value: string[]) => {
//   let error;
//   if (!value.length) {
//     error = 'Обязательное поле';
//   }

//   return error;
// };

const errorComponent = (error: string | string[]) => {
  return <div className="invalid-feedback d-block">{error}</div>;
};

export const FormikCreateUser = () => {
  const rout = useNavigate();

  const routToMainPage = () => {
    rout('/');
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          role: [],
          id: 1,
          workBorders: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            createUserStorage(values);
            routToMainPage();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, touched }) => (
          <Paper className={styles.paper} variant="outlined">
            <div className="container">
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
                    errorComponent(errors.username)}
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
                    errorComponent(errors.firstName)}
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
                    defaultValue={[roleOptions[0]]}
                    isMulti
                    component={MultiSelect}
                    options={roleOptions}
                    placeholder="Роли"
                    name="role"
                    // validate={(value: string[]) => validateArr(value)}
                  />
                  {/* {errors.role && touched.role && errorComponent(errors.role)} */}
                </div>
                <div className="form-group">
                  <Field
                    name="workBorders"
                    placeholder="Место работы"
                    isMulti
                    component={MultiSelect}
                    options={workBordersOptions}
                    // validate={(value: string[]) => validateArr(value)}
                  />
                  {/* {errors.workBorders &&
                    touched.workBorders &&
                    errorComponent(errors.workBorders)} */}
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
                    errorComponent(errors.password)}
                </div>

                <div className="form-group d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    size="sm"
                    // disabled={!!errors}
                  >
                    Создать
                  </Button>
                  <Link to={`/`} style={{ float: 'right' }}>
                    <Button variant="outline-primary" size="sm">
                      Вернуться к списку
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </Paper>
        )}
      </Formik>
    </>
  );
};
