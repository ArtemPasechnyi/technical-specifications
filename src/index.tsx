import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserList } from './page-components/CartUser/UserList';
import { FormikCreateUser } from './page-components/Formik/FormikCreateUser';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import { GET_ALL_USERS } from './page-components/common/method';
import { client } from './page-components/common/createCache';

const { cache } = client;

cache.writeQuery({
  query: GET_ALL_USERS,
  data: {
    users: [],
  },
});

const loader = (props: any) => {
  const { request } = props;
  const { url } = request;
  const urlID = new URL(url);
  const userId = Number(urlID.searchParams.get('id'));

  return { userId };
};

const router = createBrowserRouter([
  { path: '/', element: <UserList /> },
  { path: '/form', element: <FormikCreateUser />, loader },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={5} autoHideDuration={4000}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
