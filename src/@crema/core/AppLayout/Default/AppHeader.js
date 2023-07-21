import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Layout} from 'antd';
import './index.style.less';
import UserInfo from '../components/UserInfo';
// import AppLogo from '../components/AppLogo';
// import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppLogout from '../../AppLogout';
// import AppNotifications from '../../AppNotifications';
import PropTypes from 'prop-types';
// import {AiOutlineMenu} from 'react-icons/ai';
// import {useHasPermissions} from '../../../../hooks/useHasPermissions';
import SettingsIcon from './SettingsIcon';

const AppHeader = () => {
  const {Header} = Layout;
  // const can = useHasPermissions();
  const navigate = useNavigate();

  return (
    <Header className='app-header'>
      {/* <a className='trigger' onClick={() => onToggleSidebar(!isCollapsed)}>
        <AiOutlineMenu />
      </a> */}
      {/* <AppLogo /> */}
      <UserInfo hasColor />
      <div className='header-search' />
      <div className='app-header-sectionDesktop'>
        {/* <AppLanguageSwitcher /> */}
        {/* {can('list notifications') && <AppNotifications />} */}
        <div>
          <SettingsIcon onClick={() => navigate('/profile')} />
        </div>
        <AppLogout />
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  onToggleSidebar: PropTypes.func,
  isCollapsed: PropTypes.bool,
};
