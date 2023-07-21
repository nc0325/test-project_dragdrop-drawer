import React from 'react';
import {FaTachometerAlt, FaCog, FaBell, FaPercentage} from 'react-icons/fa';
//warning
//warning
//DO NOT use this use the one at /src/@crema/core/AppLayout/components/AppVerticalNav
const routesConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'sidebar.dashboard',
    type: 'item',
    icon: <FaTachometerAlt />,
    path: '/dashboard',
  },
  {
    id: 'weekly-offer',
    title: 'Weekly offer',
    messageId: 'common.weekly-offer',
    type: 'item',
    icon: <FaPercentage />,
    path: '/weekly-offer',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    messageId: 'common.notifications',
    type: 'item',
    icon: <FaBell />,
    path: '/notifications',
  },
  {
    id: 'profile',
    title: 'Profile',
    messageId: 'sidebar.profile',
    type: 'item',
    icon: <FaCog />,
    path: '/profile',
  },
];

export default routesConfig;
