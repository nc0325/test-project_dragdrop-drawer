import React from 'react';
import {useSelector} from 'react-redux';
import {Layout} from 'antd';
import {AppSuspense} from '../../index';
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages';
import AppErrorBoundary from '../AppErrorBoundary';
import './index.style.less';
import generateRoutes from '../../utility/RouteGenerator';

const {Content} = Layout;

const AppContentView = () => {
  const {user} = useSelector((state) => state.auth);
  return (
    <Content className='main-content-view'>
      <AppSuspense>
        <AppErrorBoundary>
          {generateRoutes({
            isAuthenticated: user ? true : false,
            userRole: user?.role,
            unAuthorizedStructure,
            authorizedStructure,
            anonymousStructure,
          })}
        </AppErrorBoundary>
      </AppSuspense>
    </Content>
  );
};

export default AppContentView;
