import React, {useState, useEffect} from 'react';
import FeedbacksTable from './FeedbacksTable';
import {Col} from 'antd';
import FeedbacksSettings from './FeedbacksSettings';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getFeedbacks, reset} from '../../../features/feedbacks/feedbacksSlice';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import AppCard from '../../../@crema/core/AppCard';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';

const Feedbacks = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {feedbacks, feedbacksCount, isLoading} = useSelector(
    (state) => state.feedbacks,
  );

  const onPageChange = (page) => {
    setPage(page);
    dispatch(getFeedbacks({page}));
  };

  useEffect(() => {
    dispatch(getFeedbacks({}));
    return () => dispatch(reset());
  }, []);

  return (
    <>
      <AppPageMetadata title='Feedbacks' />
      <AppRowContainer>
        <Col xs={{span: 24, order: 2}} md={{span: 14, order: 1}}>
          <AppCard title={messages['common.feedbacks']} heightFull>
            <AppsContent
              key={'wrap1'}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <FeedbacksTable loading={isLoading} feedbacks={feedbacks} />
            </AppsContent>
            <AppsFooter>
              <AppsPagination
                key={'wrap2'}
                className='account-footer-pagination'
                pageSize={20}
                count={feedbacksCount}
                page={page}
                onChange={onPageChange}
              />
            </AppsFooter>
          </AppCard>
        </Col>
        <Col xs={{span: 24, order: 1}} md={{span: 10, order: 2}}>
          <AppCard>
            <FeedbacksSettings />
          </AppCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default Feedbacks;
