import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserList } from './page-components/CartUser/UserList';
import { FormikCreateUser } from './page-components/Formik/FormikCreateUser';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';

const router = createBrowserRouter([
  { path: '/', element: <UserList /> },
  { path: '/form', element: <FormikCreateUser /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={5} autoHideDuration={4000}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
