import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {Menu, Spin} from 'antd';
import clsx from 'clsx';
import './index.style.less';
import defaultConfig from '../../../../utility/AppContextProvider/defaultConfig';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import {MenuStyle} from '../../../../../shared/constants/AppEnums';
import {renderMenu} from '../../../../utility/VerticalMenuUtils';
import {
  FaTachometerAlt,
  FaCog,
  FaBell,
  FaUsers,
  FaGifts,
  FaComments,
  FaChartBar,
  FaTasks,
  FaCalendarDay,
} from 'react-icons/fa';
import {useHasPermissions} from '../../../../../hooks/useHasPermissions';

const AppVerticalNav = () => {
  const {menuStyle, sidebarColorSet} = useSidebarContext();
  const {pathname} = useLocation();
  const can = useHasPermissions();
  const selectedKeys = pathname.substr(1).split('/');
  const defaultOpenKeys = selectedKeys[0];
  const [openKeys, setOpenKeys] = useState([defaultOpenKeys]);
  const {isLoading} = useSelector((state) => state.userInfo);

  const routesConfig = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      messageId: 'sidebar.dashboard',
      type: 'item',
      icon: <FaTachometerAlt />,
      path: '/',
    },
    can('view statistics') && {
      id: 'statistics',
      title: 'Statistics',
      messageId: 'common.statistics',
      type: 'item',
      icon: <FaChartBar />,
      path: '/statistics',
    },
    // (can('create weeklyOffer') || can('update weeklyOffer')) && {
    //   id: 'our-new',
    //   title: 'Our new offer',
    //   messageId: 'common.our-new',
    //   type: 'item',
    //   icon: <FaPercentage />,
    //   path: '/our-new',
    // },
    can('list notifications') && {
      id: 'notifications',
      title: 'Notifications',
      messageId: 'common.notifications',
      type: 'item',
      icon: <FaBell />,
      path: '/notifications',
    },
    can('list customers') && {
      id: 'customers',
      title: 'Customers',
      messageId: 'common.customers',
      type: 'item',
      icon: <FaUsers />,
      path: '/customers',
    },
    can('list feedbacks') && {
      id: 'feedbacks',
      title: 'Feedbacks',
      messageId: 'common.feedbacks',
      type: 'item',
      icon: <FaComments />,
      path: '/feedbacks',
    },
    // can('viewAny products') && {
    //   id: 'products',
    //   title: 'Products',
    //   messageId: 'common.products',
    //   type: 'item',
    //   icon: <FaTags />,
    //   path: '/products',
    // },
    can('list gift-cards') && {
      id: 'gift-cards',
      title: 'Gift cards',
      messageId: 'common.gift-cards',
      type: 'item',
      icon: <FaGifts />,
      path: '/gift-cards',
    },
    can('list reservations') && {
      id: 'reservations',
      title: 'Reservations',
      messageId: 'common.reservations',
      type: 'item',
      icon: <FaCalendarDay />,
      path: '/reservations',
    },
    {
      id: 'wating-list',
      title: 'Wating-list',
      messageId: 'common.waiting-list',
      type: 'item',
      icon: <FaTasks />,
      path: '/waiting-list-settings',
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

  const getRouteMenus = () => {
    const {sidebarColorSet} = useSidebarContext();
    const {isSidebarBgImage} = useSidebarContext();
    return routesConfig
      .filter(Boolean)
      .map((route) => renderMenu(route, sidebarColorSet, isSidebarBgImage, 0));
  };

  useEffect(() => {
    setOpenKeys([selectedKeys[selectedKeys.length - 2]]);
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return isLoading ? (
    <Spin spinning={isLoading}>
      <Menu style={{height: '100vh'}}></Menu>
    </Spin>
  ) : (
    <Menu
      theme={sidebarColorSet.mode}
      mode='inline'
      className={clsx('app-main-sidebar-menu ', {
        'menu-rounded': menuStyle === MenuStyle.ROUNDED,
        'menu-rounded rounded-menu-reverse':
          menuStyle === MenuStyle.ROUNDED_REVERSE,
        'menu-rounded standard-menu': menuStyle === MenuStyle.STANDARD,
        'menu-rounded curved-menu': menuStyle === MenuStyle.CURVED_MENU,
        'bg-color-menu':
          sidebarColorSet.sidebarBgColor !==
          defaultConfig.sidebar.colorSet.sidebarBgColor,
      })}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[selectedKeys[selectedKeys.length - 1]]}>
      {getRouteMenus(selectedKeys)}
    </Menu>
  );
};

export default AppVerticalNav;
