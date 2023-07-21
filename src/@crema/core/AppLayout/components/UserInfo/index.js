import React from 'react';
import {useSelector} from 'react-redux';
import clsx from 'clsx';
import {Avatar} from 'antd';
import './index.style.less';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider';
import PropTypes from 'prop-types';

const UserInfo = () => {
  const {themeMode} = useThemeContext();
  const {user} = useSelector((state) => state.userInfo);

  const getUserAvatar = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  return (
    <div
      className={clsx('cr-user-info cr-user-info-hasColor', {
        light: themeMode === 'light',
      })}>
      <div className='cr-user-info-inner'>
        {user?.avatar ? (
          <Avatar
            className='cr-user-info-avatar image-avatar'
            src={user.avatar}
          />
        ) : (
          <Avatar className='cr-user-info-avatar'>{getUserAvatar()}</Avatar>
        )}

        <span className='cr-user-info-content'>
          <span className='cr-user-name-info'>
            <h3
              className={clsx('cr-user-name text-truncate', {
                light: themeMode === 'light',
              })}>
              {user?.name ? user.name : 'No name'}
            </h3>
            <p className='cr-user-role'>Manager Permission</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
