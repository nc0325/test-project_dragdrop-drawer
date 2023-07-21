import React from 'react';
import ForgetPasswordJwtAuth from './ForgetPasswordJwtAuth';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AuthWrapper from '../AuthWrapper';

const ForgetPassword = () => {
  return (
    <AuthWrapper type='bottom'>
      <AppPageMetadata title='Forgot Password' />
      <ForgetPasswordJwtAuth />
    </AuthWrapper>
  );
};

export default ForgetPassword;
