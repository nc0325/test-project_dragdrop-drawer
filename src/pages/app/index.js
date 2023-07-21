import React from 'react';
import {RoutePermittedRole} from '../../shared/constants/AppEnums';

const Home = React.lazy(() => import('./home'));
const Dashboard = React.lazy(() => import('./dashboard'));
const Notifications = React.lazy(() => import('./notifications'));
// const WeeklyOffer = React.lazy(() => import('./weeklyOffer'));
const Customers = React.lazy(() => import('./customers'));
const QuickService = React.lazy(() => import('./quick-service'));
const Feedbacks = React.lazy(() => import('./feedbacks'));
const TestLoyaltyMessage = React.lazy(() => import('./testLoyaltyMessage'));
const GiftCards = React.lazy(() => import('./gift-cards'));
const Statistics = React.lazy(() => import('./statistics'));
const WaitingLiistSettings = React.lazy(() => import('./waitingLiistSettings'));
const Reservations = React.lazy(() => import('./reservations'));
const FoodicsSuccess = React.lazy(() =>
  import('./integrations/foodics/success'),
);

export const appPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: '/',
    element: <Home />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/notifications',
    element: <Notifications />,
  },
  // {
  //   permittedRole: RoutePermittedRole.user,
  //   path: '/our-new',
  //   element: <WeeklyOffer />,
  // },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/customers',
    element: <Customers />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/quick-service',
    element: <QuickService />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/feedbacks',
    element: <Feedbacks />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/gift-cards',
    element: <GiftCards />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/test-loyalty',
    element: <TestLoyaltyMessage />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/statistics',
    element: <Statistics />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/waiting-list-settings',
    element: <WaitingLiistSettings />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/reservations',
    element: <Reservations />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/integrations/foodics/success',
    element: <FoodicsSuccess />,
  },
];
