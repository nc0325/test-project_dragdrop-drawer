import React from 'react';
// import {RoutePermittedRole} from '../../shared/constants/AppEnums';

const Home = React.lazy(() => import('./home'));
// const Calendar = React.lazy(() => import('./home/scenes/calendar'));

export const tableSystemRouteConfig = [
  {
    path: '/table-system',
    element: <Home />,
  },
  {
    path: '/table-system/calendar',
    element: <Home />,
  },
  {
    path: '/table-system/list',
    element: <Home />,
  },
  {
    path: '/table-system/waitlist',
    element: <Home />,
  },
  {
    path: '/table-system/guests',
    element: <Home />,
  },
  {
    path: '/table-system/grid',
    element: <Home />,
  },
  {
    path: '/table-system/timeline',
    element: <Home />,
  },
  {
    path: '/table-system/servers',
    element: <Home />,
  },
  {
    path: '/table-system/reservations',
    element: <Home />,
  },
];
