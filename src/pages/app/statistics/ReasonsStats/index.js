import React from 'react';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppRowContainer from '../../../../@crema/core/AppRowContainer';
import {Col, Avatar} from 'antd';
import {FaHamburger, FaUserFriends, FaConciergeBell} from 'react-icons/fa';

import './index.style.less';
import MixBarChart from './MixBarChart';

const RatingStats = ({loading, totalGoodAndBadFeedbacks, feedbacksStats}) => {
  const {messages} = useIntl();

  return (
    <AppCard
      loading={loading}
      className='sales-state-card'
      title={messages['common.reasons-stats']}
      heightFull>
      <p className='sales-state-sub-title'>
        {messages['common.total-bad-good']}: {totalGoodAndBadFeedbacks}
      </p>

      <div className='sales-state-main'>
        <AppRowContainer>
          <Col xs={24} md={14} className='mb-0'>
            <div className='react-pie-chart'>
              <MixBarChart
                data={[
                  {
                    name: feedbacksStats?.feedback_options?.find(
                      (o) => o.type === 1,
                    ).option,
                    [messages['common.total']]:
                      feedbacksStats.total_food_quality_reason,
                  },
                  {
                    name: feedbacksStats?.feedback_options?.find(
                      (o) => o.type === 2,
                    ).option,
                    [messages['common.total']]:
                      feedbacksStats.total_stuff_quality_reason,
                  },
                  {
                    name: feedbacksStats?.feedback_options?.find(
                      (o) => o.type === 3,
                    ).option,
                    [messages['common.total']]:
                      feedbacksStats.total_service_quality_reason,
                  },
                ]}
              />
            </div>
          </Col>

          <Col xs={24} sm={8} className='mb-0'>
            <div className='sales-state-content'>
              <div className='sales-state-item' key={'salesState-' + 1}>
                <Avatar
                  className='stats-avatar'
                  src={<FaHamburger size={28} color='#b71b4b' />}
                  alt='icon'
                />

                <div className='sales-state-item-content'>
                  <h3>
                    {feedbacksStats.total_food_quality_reason > 0
                      ? Number.parseFloat(
                          (feedbacksStats.total_food_quality_reason /
                            totalGoodAndBadFeedbacks) *
                            100,
                        ).toFixed(1)
                      : 0}
                    %
                  </h3>
                  <p className='mb-0'>
                    {
                      feedbacksStats?.feedback_options?.find(
                        (o) => o.type === 1,
                      ).option
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className='sales-state-content'>
              <div className='sales-state-item' key={'salesState-' + 1}>
                <Avatar
                  className='stats-avatar'
                  src={<FaUserFriends size={28} color='#b71b4b' />}
                  alt='icon'
                />

                <div className='sales-state-item-content'>
                  <h3>
                    {feedbacksStats.total_stuff_quality_reason > 0
                      ? Number.parseFloat(
                          (feedbacksStats.total_stuff_quality_reason /
                            totalGoodAndBadFeedbacks) *
                            100,
                        ).toFixed(1)
                      : 0}
                    %
                  </h3>
                  <p className='mb-0'>
                    {
                      feedbacksStats?.feedback_options?.find(
                        (o) => o.type === 2,
                      ).option
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className='sales-state-content'>
              <div className='sales-state-item' key={'salesState-' + 1}>
                <Avatar
                  className='stats-avatar'
                  src={<FaConciergeBell size={28} color='#b71b4b' />}
                  alt='icon'
                />

                <div className='sales-state-item-content'>
                  <h3>
                    {feedbacksStats.total_service_quality_reason > 0
                      ? Number.parseFloat(
                          (feedbacksStats.total_service_quality_reason /
                            totalGoodAndBadFeedbacks) *
                            100,
                        ).toFixed(1)
                      : 0}
                    %
                  </h3>
                  <p className='mb-0'>
                    {
                      feedbacksStats?.feedback_options?.find(
                        (o) => o.type === 3,
                      ).option
                    }
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </AppRowContainer>
      </div>
    </AppCard>
  );
};
export default RatingStats;

RatingStats.defaultProps = {
  feedbacksStats: {},
  totalGoodAndBadFeedbacks: '',
};

RatingStats.propTypes = {
  loading: PropTypes.bool,
  feedbacksStats: PropTypes.object,
  totalGoodAndBadFeedbacks:
    PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
};
