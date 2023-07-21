import React from 'react';
import {Avatar} from 'antd';
import PropTypes from 'prop-types';
import AppCard from '../../../@crema/core/AppCard';
import './index.style.less';

const StatsCard = ({icon, bgColor, text, value}) => {
  return (
    <AppCard heightFull className='metrics-stats-card'>
      <Avatar
        className='metrics-stats-avatar'
        src={icon}
        style={{backgroundColor: bgColor}}
      />
      <p>{text}</p>
      <h3>{value}</h3>
    </AppCard>
  );
};

export default StatsCard;

StatsCard.defaultProps = {
  bgColor: '',
  value: '',
};

StatsCard.propTypes = {
  text: PropTypes.any.isRequired,
  bgColor: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
};
