import React from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {Divider, Dropdown, Menu} from 'antd';
import './index.style.less';
import LogoutIcon from './LogoutIcon';
import LogoutButtonIcon from './LogoutButtonIcon';
import LogoutCancelButtonIcon from './LogoutCancelButtonIcon';
import {useDispatch} from 'react-redux';
import {logout, reset} from '../../../features/auth/authSlice';

const AppLogoutIcon = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const menu = (
    <Menu className='header-icon'>
      <Menu.Item
        icon={<LogoutButtonIcon style={{width: '16px'}} />}
        onClick={handleLogout}>
        <div className='menu-item'>
          <h4 className='submenu-title'>{messages['common.logout']}</h4>
        </div>
      </Menu.Item>
      <Divider />
      <Menu.Item
        icon={<LogoutCancelButtonIcon style={{width: '16px'}} />}
        onClick={() => {}}>
        <div className='menu-item'>
          <h4 className='submenu-title'>{messages['common.cancel']}</h4>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        overlayStyle={{zIndex: 1052}}>
        <a
          className='ant-dropdown-link langBtn'
          onClick={(e) => e.preventDefault()}>
          <span className='lang-icon'>
            <LogoutIcon style={{width: '18px'}} />
          </span>
        </a>
      </Dropdown>
    </>
  );
};

export default AppLogoutIcon;

AppLogoutIcon.defaultProps = {
  iconOnly: false,
};

AppLogoutIcon.propTypes = {
  iconOnly: PropTypes.bool,
};
