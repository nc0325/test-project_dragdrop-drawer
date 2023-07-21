import React from 'react';
import Error401 from './Error401';
import Error404 from './Error404';
import Error500 from './Error500';
import ComingSoon from './ComingSoon';
import Maintenance from './Maintenance';
import Error403 from './Error403';

export const errorPagesConfigs = [
  {
    path: '/extra-pages/error-pages/error-401',
    element: <Error401 />,
  },
  {
    path: '/extra-pages/error-pages/error-403',
    element: <Error403 />,
  },
  {
    path: '/extra-pages/error-pages/error-404',
    element: <Error404 />,
  },
  {
    path: '/extra-pages/error-pages/error-500',
    element: <Error500 />,
  },
  {
    path: '/extra-pages/error-pages/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '/extra-pages/error-pages/maintenance',
    element: <Maintenance />,
  },
];
