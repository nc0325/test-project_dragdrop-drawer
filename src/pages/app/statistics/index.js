import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import {Col, Select} from 'antd';
import DoubleStatsCard from '../../../components/statistics/DoubleStatsCard';
import CustomersStatsCard from '../../../components/statistics/CustomersStatsCard';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {blue, green, orange, purple, volcano} from '@ant-design/colors';
import {
  FaUsers,
  FaPlus,
  FaSync,
  FaStopwatch,
  FaDoorOpen,
  FaGifts,
  FaGift,
  FaEye,
  FaUserCheck,
  FaUserEdit,
} from 'react-icons/fa';
import {getCustomersStats} from '../../../features/customers/customersSlice';
import {getWaitingListStats} from '../../../features/waitingList/waitingListSlice';
import {getGiftCardsStats} from '../../../features/gift-card/giftCardSlice';
import {getLoyalty} from '../../../features/loyalty/loyaltySlice';
import {getFeedbacksStats} from '../../../features/feedbacks/feedbacksSlice';
import {getCustomersEngagementStats} from '../../../features/customersEngagement/customersEngagementSlice';
import RatingStats from '../statistics/RatingStats';
import ReasonsStats from '../statistics/ReasonsStats';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const Statistics = () => {
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const {customersStats, isCustomersStatsLoading} = useSelector(
    (state) => state.customers,
  );

  const {waitingListStats, isWaitingListStatsLoading} = useSelector(
    (state) => state.waitingList,
  );

  const {giftCardsStats, isGiftCardsStatsLoading} = useSelector(
    (state) => state.giftCard,
  );

  const {loyalty, isLoading: isLoyaltyLoading} = useSelector(
    (state) => state.loyalty,
  );

  const {feedbacksStats, isFeedbacksStatsLoading} = useSelector(
    (state) => state.feedbacks,
  );

  const {
    customersEngagementStats,
    isLoading: isCustomersEngagementStatsLoading,
  } = useSelector((state) => state.customersEngagement);

  const handleCustomerStatsChnage = (value) => {
    dispatch(getCustomersStats({time: value}));
  };

  const handleWaitingListStatsChnage = (value) => {
    dispatch(getWaitingListStats({time: value}));
  };

  const handleGiftCardsStatsChnage = (value) => {
    dispatch(getGiftCardsStats({time: value}));
  };

  const handleCustomerEngagementStatsChnage = (value) => {
    dispatch(getCustomersEngagementStats({time: value}));
  };

  useEffect(() => {
    if (can('view customers statistics')) {
      dispatch(getCustomersStats({time: 'today'}));
    }
  }, [can('view customers statistics')]);

  useEffect(() => {
    if (can('view gift-cards statistics')) {
      dispatch(getGiftCardsStats({time: 'today'}));
    }
  }, [can('view gift-cards statistics')]);

  useEffect(() => {
    if (can('view loyalty')) {
      dispatch(getLoyalty());
    }
  }, [can('view loyalty')]);

  useEffect(() => {
    if (can('view feedbacks statistics')) {
      dispatch(getFeedbacksStats());
    }
  }, [can('view feedbacks statistics')]);

  useEffect(() => {
    if (can('view customers-engagement statistics')) {
      dispatch(getCustomersEngagementStats({time: 'today'}));
    }
  }, [can('view customers-engagement statistics')]);

  useEffect(() => {
    if (can('view waiting-lists statistics')) {
      dispatch(getWaitingListStats({time: 'today'}));
    }
  }, [can('view waiting-lists statistics')]);

  return (
    <>
      <AppPageMetadata title='Feedbacks' />
      <AppRowContainer>
        <Col xs={24} md={12}>
          {can('view customers-engagement statistics') && (
            <CustomersStatsCard
              loading={isCustomersEngagementStatsLoading}
              extra={
                <Select
                  size='small'
                  onChange={handleCustomerEngagementStatsChnage}
                  defaultValue='today'>
                  <Select.Option value='today'>
                    {<IntlMessages id='common.today' />}
                  </Select.Option>
                  <Select.Option value=''>
                    {<IntlMessages id='common.all' />}
                  </Select.Option>
                </Select>
              }
              firstIcon={<FaEye size={24} />}
              firstBgColor={volcano[3]}
              firstText={<IntlMessages id='common.customersEngagementTotal' />}
              firstValue={
                Number(customersEngagementStats.total_new) +
                Number(customersEngagementStats.total_returned)
              }
              secondIcon={<FaUserCheck size={24} />}
              secondBgColor={volcano[3]}
              secondText={
                <IntlMessages id='common.newCustomersEngagementTotal' />
              }
              secondValue={customersEngagementStats.total_new}
              thirdIcon={<FaUserEdit size={24} />}
              thirdBgColor={volcano[3]}
              thirdText={
                <IntlMessages id='common.returnsCustomersEngagementTotal' />
              }
              thirdValue={customersEngagementStats.total_returned}
            />
          )}
        </Col>
        <Col xs={24} md={12}>
          {can('view customers statistics') && (
            <CustomersStatsCard
              loading={isCustomersStatsLoading}
              extra={
                <Select
                  size='small'
                  onChange={handleCustomerStatsChnage}
                  defaultValue='today'>
                  <Select.Option value='today'>
                    {<IntlMessages id='common.today' />}
                  </Select.Option>
                  <Select.Option value=''>
                    {<IntlMessages id='common.all' />}
                  </Select.Option>
                </Select>
              }
              firstIcon={<FaUsers size={24} />}
              firstBgColor={blue[3]}
              firstText={<IntlMessages id='common.customersTotal' />}
              firstValue={customersStats.total_customers}
              secondIcon={<FaPlus size={24} />}
              secondBgColor={blue[3]}
              secondText={<IntlMessages id='common.newCustomersTotal' />}
              secondValue={customersStats.total_new_customers}
              thirdIcon={<FaSync size={24} />}
              thirdBgColor={blue[3]}
              thirdText={<IntlMessages id='common.returnsCustomersTotal' />}
              thirdValue={customersStats.total_returns_customers}
            />
          )}
        </Col>
        {can('view waiting-lists statistics') && (
          <Col xs={24} md={12}>
            <DoubleStatsCard
              loading={isWaitingListStatsLoading}
              extra={
                <Select
                  size='small'
                  onChange={handleWaitingListStatsChnage}
                  defaultValue='today'>
                  <Select.Option value='today'>
                    {<IntlMessages id='common.today' />}
                  </Select.Option>
                  <Select.Option value=''>
                    {<IntlMessages id='common.all' />}
                  </Select.Option>
                </Select>
              }
              firstIcon={<FaStopwatch size={24} />}
              firstBgColor={green[3]}
              firstText={<IntlMessages id='common.waitingListTotal' />}
              firstValue={waitingListStats.total_waiting_list}
              secondIcon={<FaDoorOpen size={24} />}
              secondBgColor={green[3]}
              secondText={<IntlMessages id='common.waitingListUsedTotal' />}
              secondValue={waitingListStats.total_served_waiting_list}
            />
          </Col>
        )}
        {can('view loyalty') && (
          <Col xs={24} md={12}>
            <DoubleStatsCard
              loading={isLoyaltyLoading}
              extra={<IntlMessages id='dashboard.social.loyalty-program' />}
              firstIcon={<FaEye size={24} />}
              firstBgColor={purple[3]}
              firstText={<IntlMessages id='dashboard.social.engagement' />}
              firstValue={loyalty?.total_engagement}
              secondIcon={<FaUserCheck size={24} />}
              secondBgColor={purple[3]}
              secondText={<IntlMessages id='dashboard.social.used' />}
              secondValue={loyalty?.total_used}
            />
          </Col>
        )}
        {can('view feedbacks statistics') && (
          <Col xs={{span: 24, order: 2}} md={{span: 14, order: 1}}>
            <RatingStats
              loading={isFeedbacksStatsLoading}
              totalFeedbacks={feedbacksStats.total_feedbacks}
              feedbacksStats={feedbacksStats}
            />
          </Col>
        )}
        {can('view gift-cards statistics') && (
          <Col xs={{span: 24, order: 1}} md={{span: 10, order: 2}}>
            <DoubleStatsCard
              loading={isGiftCardsStatsLoading}
              extra={
                <Select
                  size='small'
                  onChange={handleGiftCardsStatsChnage}
                  defaultValue='today'>
                  <Select.Option value='today'>
                    {<IntlMessages id='common.today' />}
                  </Select.Option>
                  <Select.Option value=''>
                    {<IntlMessages id='common.all' />}
                  </Select.Option>
                </Select>
              }
              firstIcon={<FaGifts size={24} />}
              firstBgColor={orange[3]}
              firstText={<IntlMessages id='common.giftCardsTotal' />}
              firstValue={giftCardsStats.total_gift_cards}
              secondIcon={<FaGift size={24} />}
              secondBgColor={orange[3]}
              secondText={<IntlMessages id='common.giftCardsUsedTotal' />}
              secondValue={giftCardsStats.total_used_gift_cards}
            />
          </Col>
        )}
        {can('view feedbacks statistics') && (
          <Col xs={{span: 24, order: 3}} md={{span: 14, order: 3}}>
            <ReasonsStats
              loading={isFeedbacksStatsLoading}
              totalGoodAndBadFeedbacks={
                feedbacksStats.total_good_and_bad_feedbacks
              }
              feedbacksStats={feedbacksStats}
            />
          </Col>
        )}
        <Col xs={{span: 24, order: 4}} md={{span: 10, order: 4}}></Col>
      </AppRowContainer>
    </>
  );
};

export default Statistics;
