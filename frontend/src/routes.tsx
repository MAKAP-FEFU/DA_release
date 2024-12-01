/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import ErrorPage from '@/pages/Error';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Models = lazy(() => import('@/pages/Models'));
const Connections = lazy(() => import('@/pages/Connections'));
const Sources = lazy(() => import('@/pages/Sources'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'models',
        element: <Models />,
      },
      {
        path: 'connections',
        element: <Connections />,
      },
      {
        path: 'sources',
        element: <Sources />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
