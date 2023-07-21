import React from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppCard from '../../../@crema/core/AppCard';
import Icon from '@ant-design/icons';
import './index.style.less';

const AppHomeCard = ({title, icon, color, path, isBlocked}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (path && !isBlocked) {
      navigate(path);
    }
  };

  return (
    <div className='app-home-card-container'>
      <AppCard
        onClick={handleNavigate}
        className='app-home-card'
        style={{
          backgroundColor: color,
          opacity: isBlocked ? 0.3 : 1,
          cursor: isBlocked ? 'default' : 'pointer',
        }}>
        <Icon component={icon} className='app-home-icon' />
      </AppCard>
      <h3 className='app-home-card-title'>{title}</h3>
    </div>
  );
};

export default AppHomeCard;

AppHomeCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  color: PropTypes.string,
  path: PropTypes.string,
  isBlocked: PropTypes.bool,
};
