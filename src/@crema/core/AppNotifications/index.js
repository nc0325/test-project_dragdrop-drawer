import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {List, Button, Dropdown, Menu, Badge} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import AppScrollbar from '../AppScrollbar';
import IntlMessages from '../../utility/IntlMessages';
import NotificationItem from './NotificationItem';
import './index.style.less';
import {IoIosNotificationsOutline} from 'react-icons/io';
import {markUnreadNotificationsAsRead} from '../../../features/userInfo/userInfoSlice';

const AppNotifications = () => {
  const {
    isLoadingNotifications,
    unreadNotifications,
    unreadNotificationsCount,
  } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotificationDropdownClick = () => {
    if (unreadNotificationsCount > 0) {
      dispatch(markUnreadNotificationsAsRead());
    }
  };

  const menu = (
    <Menu className='notify-header-message'>
      <Menu.Item className='header'>
        <IntlMessages id='common.notifications' />
      </Menu.Item>
      <Menu.Item>
        <AppScrollbar className='notify-scroll-submenu'>
          <List
            className='notify-list'
            dataSource={unreadNotifications}
            renderItem={(item) => {
              return <NotificationItem key={item.id} item={item} />;
            }}
          />
        </AppScrollbar>
      </Menu.Item>
      <Menu.Item>
        <Button
          type='primary'
          onClick={() => navigate('/notifications')}
          className='notify-btn-all'>
          <IntlMessages id='common.viewAll' />
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      onClick={handleNotificationDropdownClick}
      overlay={menu}
      className='dropdown'
      trigger={['click']}>
      {isLoadingNotifications ? (
        <div className='notify-link'>
          <span className='notify-icon'>
            <LoadingOutlined />
          </span>
        </div>
      ) : (
        <Badge className='notify-link' count={unreadNotificationsCount}>
          <span className='notify-icon'>
            <IoIosNotificationsOutline />
          </span>
        </Badge>
      )}
    </Dropdown>
  );
};

export default AppNotifications;
