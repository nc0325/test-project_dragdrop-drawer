import React from 'react';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppRowContainer from '../../../../@crema/core/AppRowContainer';
import {Col, Avatar} from 'antd';
import {FaGrinHearts, FaSmile, FaFrown} from 'react-icons/fa';

import './index.style.less';
import MixBarChart from './MixBarChart';

const RatingStats = ({loading, totalFeedbacks, feedbacksStats}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      loading={loading}
      className='sales-state-card'
      title={messages['common.rating-stats']}
      heightFull>
      <p className='sales-state-sub-title'>
        {messages['common.total-feedback']}: {totalFeedbacks}
      </p>

      <div className='sales-state-main'>
        <AppRowContainer>
          <Col xs={24} md={14} className='mb-0'>
            <div className='react-pie-chart'>
              <MixBarChart
                data={[
                  {
                    name: messages['common.excellent'],
                    [messages['common.total']]:
                      feedbacksStats.total_excellent_feedbacks,
                  },
                  {
                    name: messages['common.good'],
                    [messages['common.total']]:
                      feedbacksStats.total_good_feedbacks,
                  },
                  {
                    name: messages['common.bad'],
                    [messages['common.total']]:
                      feedbacksStats.total_bad_feedbacks,
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
                  src={<FaGrinHearts size={28} color='#b71b4b' />}
                  alt='icon'
                />

                <div className='sales-state-item-content'>
                  <h3>
                    {feedbacksStats.total_excellent_feedbacks > 0
                      ? Number.parseFloat(
                          (feedbacksStats.total_excellent_feedbacks /
                            totalFeedbacks) *
                            100,
                        ).toFixed(1)
                      : 0}
                    %
                  </h3>
                  <p className='mb-0'>
                    {messages['common.excellent-ratings-percantage']}
                  </p>
                </div>
              </div>
            </div>
            <div className='sales-state-content'>
              <div className='sales-state-item' key={'salesState-' + 1}>
                <Avatar
                  className='stats-avatar'
                  src={<FaSmile size={28} color='#b71b4b' />}
                  alt='icon'
                />

                <div className='sales-state-item-content'>
                  <h3>
                    {feedbacksStats.total_good_feedbacks > 0
                      ? Number.parseFloat(
                          (feedbacksStats.total_good_feedbacks /
                            totalFeedbacks) *
                            100,
                        ).toFixed(1)
                      : 0}
                    %
                  </h3>
                  <p className='mb-0'>
                    {messages['common.good-ratings-percantage']}
                  </p>
                </div>
              </div>
            </div>
            <div className='sales-state-content'>
              <div className='sales-state-item' key={'salesState-' + 1}>
                <Avatar
                  className='stats-avatar'
                  src={<FaFrown size={28} color='#b71b4b' />}
                  alt='icon'
                />

                <div className='sales-state-item-content'>
                  <h3>
                    {feedbacksStats.total_bad_feedbacks > 0
                      ? Number.parseFloat(
                          (feedbacksStats.total_bad_feedbacks /
                            totalFeedbacks) *
                            100,
                        ).toFixed(1)
                      : 0}
                    %
                  </h3>
                  <p className='mb-0'>
                    {messages['common.bad-ratings-percantage']}
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
  totalFeedbacks: '',
};

RatingStats.propTypes = {
  loading: PropTypes.bool,
  feedbacksStats: PropTypes.object,
  totalFeedbacks: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
};
