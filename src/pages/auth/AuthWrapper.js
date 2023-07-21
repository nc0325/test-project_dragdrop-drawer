import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
// import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import './AuthWrapper.style.less';
// import {AppInfoView} from '../../@crema';
import AppLogo from '../../@crema/core/AppLayout/components/AppLogo';
import AppLanguageSwitcher from '../../@crema/core/AppLanguageSwitcher';

const AuthWrapper = ({children}) => {
  return (
    <>
      <div className='auth-langBtn'>
        <AppLanguageSwitcher />
      </div>
      <div className='auth-wrap' key={'wrap'}>
        <Card className='auth-card'>
          <div className='auth-main-content'>
            <div className='auth-card-header'>
              <AppLogo />
            </div>
            {children}
          </div>
        </Card>
      </div>
    </>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
