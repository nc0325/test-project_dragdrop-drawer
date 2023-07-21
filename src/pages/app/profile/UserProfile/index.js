import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import './index.style.less';
import {Tabs, Spin} from 'antd';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
import Account from './Account';
// import Notification from './Notification';
import Integrations from './Integrations';

import {HiUser} from 'react-icons/hi';
import {AiFillLock} from 'react-icons/ai';
import {FaCog, FaNetworkWired} from 'react-icons/fa';
// import {IoMdNotifications} from 'react-icons/io';
// import accountData from '../../../../@crema/services/db/account';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useHasPermissions} from '../../../../hooks/useHasPermissions';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const can = useHasPermissions();
  const TabPane = Tabs.TabPane;

  const {isLoading} = useSelector((state) => state.userInfo);

  const handleTabClick = (key) => {
    switch (key) {
      case '1':
        return navigate('/profile');
      case '2':
        return navigate('/profile/change-password');
      case '3':
        return navigate('/account');
      case '4':
        return navigate('/integrations');
      default:
        return navigate('/profile');
    }
  };

  const handleActiveTab = () => {
    switch (location.pathname) {
      case '/profile':
        return '1';
      case '/profile/change-password':
        return '2';
      case '/account':
        return '3';
      case '/integrations':
        return '4';
      default:
        return '1';
    }
  };

  return (
    <div className='user-profile-container'>
      <Spin spinning={isLoading}>
        {!isLoading && (
          <Tabs
            onTabClick={handleTabClick}
            className='user-profile-tabs'
            defaultActiveKey={handleActiveTab()}
            tabPosition='left'>
            <TabPane
              tab={
                <span className='user-profile-icon'>
                  <HiUser className='icon' />
                  <span>
                    <IntlMessages id='userProfile.personalInfo' />
                  </span>
                </span>
              }
              key='1'>
              <PersonalInfo />
            </TabPane>
            <TabPane
              active={true}
              tab={
                <span className='user-profile-icon'>
                  <AiFillLock className='icon' />
                  <span>
                    <IntlMessages id='userProfile.changePassword' />
                  </span>
                </span>
              }
              key='2'>
              <ChangePassword />
            </TabPane>
            {can('update account') && (
              <TabPane
                tab={
                  <span className='user-profile-icon'>
                    <FaCog className='icon' />
                    <span>
                      <IntlMessages id='userProfile.account' />
                    </span>
                  </span>
                }
                key='3'>
                <Account />
              </TabPane>
            )}

            <TabPane
              tab={
                <span className='user-profile-icon'>
                  <FaNetworkWired className='icon' />
                  <span>
                    <IntlMessages id='common.integrations' />
                  </span>
                </span>
              }
              key='4'>
              <Integrations />
            </TabPane>
            {/* <TabPane
          tab={
            <span className='user-profile-icon'>
              <IoMdNotifications className='icon' />
              <span>
                <IntlMessages id='userProfile.notification' />
              </span>
            </span>
          }
          key='5'>
          <Notification notification={accountData.notification} />
        </TabPane> */}
          </Tabs>
        )}
      </Spin>
    </div>
  );
};

export default UserProfile;
