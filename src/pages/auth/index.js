import React from 'react';

const Signin = React.lazy(() => import('./Signin'));
const Signup = React.lazy(() => import('./Signup'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));

export const authRouteConfig = [
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },
];
