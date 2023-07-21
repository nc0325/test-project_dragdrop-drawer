import React from 'react';
import PropTypes from 'prop-types';
import {Card, Spin} from 'antd';
import './PublicWrapper.style.less';
import AppLanguageSwitcher from '../../@crema/core/AppLanguageSwitcher';

const PublicWrapper = ({children, title, loading}) => {
  return (
    <Spin spinning={loading}>
      <div className='public-langBtn'>
        <AppLanguageSwitcher />
      </div>
      <div className='public-wrap' key={'wrap'}>
        <Card className='public-card'>
          <div className='public-main-content'>
            <div className='public-card-header'>{title}</div>
            {children}
          </div>
        </Card>
      </div>
    </Spin>
  );
};

export default PublicWrapper;

PublicWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  loading: PropTypes.bool,
};
