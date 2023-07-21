import React from 'react';
import {Avatar, Col} from 'antd';
import PropTypes from 'prop-types';
import AppCard from '../../../@crema/core/AppCard';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import Spinner from '../../shared/Spinner';
import './index.style.less';

const DoubleStatsCard = ({
  extra,
  loading,
  firstIcon,
  firstBgColor,
  firstText,
  firstValue,
  secondIcon,
  secondBgColor,
  secondText,
  secondValue,
}) => {
  return (
    <AppCard extra={extra} heightFull className='metrics-stats-card'>
      <AppRowContainer>
        <Col xs={12}>
          <Avatar
            className='metrics-stats-avatar'
            src={firstIcon}
            style={{backgroundColor: firstBgColor}}
          />
          <p>{firstText}</p>
          {loading ? <Spinner /> : <h3>{firstValue}</h3>}
        </Col>
        <Col xs={12}>
          <Avatar
            className='metrics-stats-avatar'
            src={secondIcon}
            style={{backgroundColor: secondBgColor}}
          />
          <p>{secondText}</p>
          {loading ? <Spinner /> : <h3>{secondValue}</h3>}
        </Col>
      </AppRowContainer>
    </AppCard>
  );
};

export default DoubleStatsCard;

DoubleStatsCard.defaultProps = {
  firstBgColor: '',
  firstValue: '',
  secondBgColor: '',
  secondValue: '',
};

DoubleStatsCard.propTypes = {
  firstIcon: PropTypes.string,
  firstBgColor: PropTypes.string,
  firstText: PropTypes.any.isRequired,
  firstValue: PropTypes.string,
  secondIcon: PropTypes.string,
  secondBgColor: PropTypes.string,
  secondText: PropTypes.any.isRequired,
  secondValue: PropTypes.string,
  extra: PropTypes.any,
  loading: PropTypes.bool,
};
