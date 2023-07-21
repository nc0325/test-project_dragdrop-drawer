import React from 'react';
import {Avatar, Space, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import AppCard from '../../../@crema/core/AppCard';
import './index.style.less';

const HorizontalStatsCard = (props) => {
  const {loading, icon, value, heading} = props;

  return (
    <AppCard className='stats-card'>
      <div className='stats-row'>
        <Avatar className='stats-avatar' src={icon} />
        <div className='stats-content'>
          <h3>
            {loading ? (
              <Space>
                <Spin indicator={<LoadingOutlined />} />
              </Space>
            ) : (
              value
            )}
          </h3>
          <p>{heading}</p>
        </div>
      </div>
    </AppCard>
  );
};

export default HorizontalStatsCard;

HorizontalStatsCard.defaultProps = {
  value: '',
};

HorizontalStatsCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  heading: PropTypes.any.isRequired,
  loading: PropTypes.bool,
};
