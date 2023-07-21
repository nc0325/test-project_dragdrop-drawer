import React from 'react';
import {Layout} from 'antd';
import './index.style.less';
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai';
import PropTypes from 'prop-types';
import AppLogo from '../components/AppLogo';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppNotifications from '../../AppNotifications';
import {useHasPermissions} from '../../../../hooks/useHasPermissions';

const AppHeader = ({isCollapsed, onToggleSidebar}) => {
  const {Header} = Layout;
  const can = useHasPermissions();

  return (
    <Header className='app-header-mini-sidebar'>
      {React.createElement(
        isCollapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
        {
          className: 'trigger',
          onClick: onToggleSidebar,
        },
      )}
      <AppLogo />

      <div className='header-search-mini-sidebar' />
      <div className='app-header-mini-sidebar-sectionDesktop'>
        <AppLanguageSwitcher />
        {can('list notifications') && <AppNotifications />}
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};
