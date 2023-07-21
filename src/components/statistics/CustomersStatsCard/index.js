import React from 'react';
import {Avatar, Col} from 'antd';
import PropTypes from 'prop-types';
import AppCard from '../../../@crema/core/AppCard';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import Spinner from '../../shared/Spinner';
import './index.style.less';

const CustomersStatsCard = ({
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
  thirdIcon,
  thirdBgColor,
  thirdText,
  thirdValue,
}) => {
  return (
    <AppCard extra={extra} heightFull className='metrics-stats-card'>
      <AppRowContainer>
        <Col xs={8}>
          <Avatar
            className='metrics-stats-avatar'
            src={firstIcon}
            style={{backgroundColor: firstBgColor}}
          />
          <p>{firstText}</p>
          {loading ? <Spinner /> : <h3>{firstValue}</h3>}
        </Col>
        <Col xs={8}>
          <Avatar
            className='metrics-stats-avatar'
            src={secondIcon}
            style={{backgroundColor: secondBgColor}}
          />
          <p>{secondText}</p>
          {loading ? <Spinner /> : <h3>{secondValue}</h3>}
        </Col>
        <Col xs={8}>
          <Avatar
            className='metrics-stats-avatar'
            src={thirdIcon}
            style={{backgroundColor: thirdBgColor}}
          />
          <p>{thirdText}</p>
          {loading ? <Spinner /> : <h3>{thirdValue}</h3>}
        </Col>
      </AppRowContainer>
    </AppCard>
  );
};

export default CustomersStatsCard;

CustomersStatsCard.defaultProps = {
  firstBgColor: '',
  firstValue: '',
  secondBgColor: '',
  secondValue: '',
};

CustomersStatsCard.propTypes = {
  firstIcon: PropTypes.string,
  firstBgColor: PropTypes.string,
  firstText: PropTypes.any.isRequired,
  firstValue: PropTypes.string,
  secondIcon: PropTypes.string,
  secondBgColor: PropTypes.string,
  secondText: PropTypes.any.isRequired,
  secondValue: PropTypes.string,
  thirdIcon: PropTypes.string,
  thirdBgColor: PropTypes.string,
  thirdText: PropTypes.any.isRequired,
  thirdValue: PropTypes.string,
  extra: PropTypes.any,
  loading: PropTypes.bool,
};
