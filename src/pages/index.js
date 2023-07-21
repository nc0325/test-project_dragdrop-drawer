import {errorPagesConfigs} from './errorPages';
import {authRouteConfig} from './auth';
import {publicRouteConfig} from './public';
import {tableSystemRouteConfig} from './tableSystem';
import {initialUrl} from '../shared/constants/AppConst';
import Error403 from './errorPages/Error403';
import React from 'react';
import {appPagesConfigs} from './app';
import Error404 from './errorPages/Error404';
import {profileConfig} from './app/profile';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [...appPagesConfigs, ...profileConfig, ...tableSystemRouteConfig],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    ...publicRouteConfig,
    {
      path: '*',
      element: <Error404 />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
