import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Layout} from 'antd';
import {useUrlSearchParams} from 'use-url-search-params';
import './layout.style.less';
import {AppContentView} from '../../index';
import {AppNormalizedContentView} from '../../index';
import Layouts from './Layouts';
import {LayoutType} from '../../../shared/constants/AppEnums';
import AppScrollbar from '../AppScrollbar';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../utility/AppContextProvider/LayoutContextProvider';
import {useSidebarActionsContext} from '../../utility/AppContextProvider/SidebarContextProvider';
import {useLocation, matchPath} from 'react-router';

const AppLayout = () => {
  const {user} = useSelector((state) => state.auth);
  const {navStyle, layoutType} = useLayoutContext();
  const {updateNavStyle} = useLayoutActionsContext();
  const {updateMenuStyle, setSidebarBgImage} = useSidebarActionsContext();
  const [params] = useUrlSearchParams();
  const {pathname} = useLocation();
  const isTableSystemPath = matchPath('/table-system/*', pathname);

  const AppLayout = Layouts[navStyle];

  useEffect(() => {
    if (layoutType === LayoutType.BOXED) {
      document.body.classList.add('boxedLayout');
      document.body.classList.remove('framedLayout');
    } else if (layoutType === LayoutType.FRAMED) {
      document.body.classList.remove('boxedLayout');
      document.body.classList.add('framedLayout');
    } else {
      document.body.classList.remove('boxedLayout');
      document.body.classList.remove('framedLayout');
    }
  }, [layoutType]);

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, []);

  return (
    <React.Fragment>
      {isTableSystemPath ? (
        <AppNormalizedContentView />
      ) : user ? (
        <AppLayout />
      ) : (
        <Layout className='auth'>
          <AppScrollbar className='main-auth-scrollbar'>
            <AppContentView />
          </AppScrollbar>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default React.memo(AppLayout);
