import React from 'react';
import './index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SignupJwtAuth from './SignupJwtAuth';

const Signup = () => {
  return (
    <AuthWrapper>
      <AppPageMetadata title='Register' />
      <SignupJwtAuth />
    </AuthWrapper>
  );
};

export default Signup;
