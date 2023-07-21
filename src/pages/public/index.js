import React from 'react';

const WaitingList = React.lazy(() => import('./WaitingList'));
const Reservation = React.lazy(() => import('./Reservation'));

export const publicRouteConfig = [
  {
    path: '/waiting-list/:id/book',
    element: <WaitingList />,
  },
  {
    path: '/reservation/:id/book',
    element: <Reservation />,
  },
];
