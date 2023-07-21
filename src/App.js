import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './shared/styles/crema.less';
import {
  AppContextProvider,
  AppLayout,
  AppLocaleProvider,
  AppThemeProvider,
  AuthRoutes,
} from './@crema';
import {BrowserRouter} from 'react-router-dom';
import {getUserInfo} from './features/userInfo/userInfoSlice';
import './@crema/services/index';
const App = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getUserInfo());
    }
  }, [user]);

  return (
    <AppContextProvider>
      <AppThemeProvider>
        <AppLocaleProvider>
          <BrowserRouter>
            <AuthRoutes>
              <AppLayout />
            </AuthRoutes>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
};

export default App;
