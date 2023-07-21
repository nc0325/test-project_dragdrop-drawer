import React from 'react';
import {useSelector} from 'react-redux';
import {AppSuspense} from '../../index';
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages';
import AppErrorBoundary from '../AppErrorBoundary';
import generateRoutes from '../../utility/RouteGenerator';

const AppContentView = () => {
  const {user} = useSelector((state) => state.auth);
  return (
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
  );
};

export default AppContentView;
