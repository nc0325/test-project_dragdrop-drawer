import React from 'react';

const UserProfile = React.lazy(() => import('./UserProfile'));

export const profileConfig = [
  {
    path: '/profile',
    element: <UserProfile />,
  },
  {
    path: '/profile/change-password',
    element: <UserProfile />,
  },
  {
    path: '/account',
    element: <UserProfile />,
  },
  {
    path: '/integrations',
    element: <UserProfile />,
  },
];
