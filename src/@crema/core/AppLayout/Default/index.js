import React, {useEffect, useState} from 'react';
import {Grid, Layout} from 'antd';
// import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import './index.style.less';
import {AppContentView} from '../../../index';
import AppFooter from '../components/AppFooter';
// import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import {FooterType} from '../../../../shared/constants/AppEnums';
import {isEmpty} from '../../../utility/GlobalHelper';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';

const {useBreakpoint} = Grid;

const Default = () => {
  const width = useBreakpoint();
  const [isCollapsed, setCollapsed] = useState(true);
  const {footer, footerType} = useLayoutContext();

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isEmpty(width)) {
      setCollapsed(true);
    }
  }, [width]);

  return (
    <Layout
      className={clsx('app-layout', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      {/* <AppSidebar isCollapsed={isCollapsed} /> */}
      <Layout className='app-layout-main'>
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <AppContentView />
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default React.memo(Default);
