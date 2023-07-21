import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CheckCode from '../../../components/dashboard/CheckCode';
import AddService from '../../../components/dashboard/AddService';
import LoyaltyProgramCard from '../../../components/dashboard/LoyaltyProgramCard';
import GiftCard from '../../../components/dashboard/GiftCard';
import WaitingList from '../../../components/dashboard/WaitingList';
import Reservations from '../../../components/dashboard/Reservations';
import DashboardSkeleton from '../../../components/dashboard/DashboardSkeleton';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {Col} from 'antd';
import {getDashboardData} from '../../../features/home/homeSlice';
import {getActiveWaitingList} from '../../../features/activeWaitingList/activeWaitingListSlice';
import {getActiveReservations} from '../../../features/activeReservations/activeReservationsSlice';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const {loyalty, isSuccess} = useSelector((state) => state.home);
  const {waitingList, isLoading: isActiveWaitingListLoading} = useSelector(
    (state) => state.activeWaitingList,
  );
  const {activeReservations, isLoading: isActiveReservationsLoading} =
    useSelector((state) => state.activeReservations);

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  useEffect(() => {
    if (can('list waiting-list')) {
      dispatch(getActiveWaitingList());
    }
  }, [can('list waiting-list')]);

  useEffect(() => {
    if (can('list reservations')) {
      dispatch(getActiveReservations());
    }
  }, [can('list reservations')]);

  return isSuccess ? (
    <AppRowContainer>
      <Col xs={24}>
        <AppRowContainer>
          {can('create service') && (
            <Col xs={24} md={14}>
              <AddService />
            </Col>
          )}
          {can('check code') && (
            <Col xs={24} md={10}>
              <CheckCode />
            </Col>
          )}
          {can('create gift-card') && (
            <Col xs={24} md={14}>
              <GiftCard icon='gift-card.svg' title={`dashboard.gift-card`} />
            </Col>
          )}
          {can('list reservations') && (
            <Col xs={24} md={14}>
              <Reservations
                reservations={activeReservations}
                loading={isActiveReservationsLoading}
              />
            </Col>
          )}
          {can('list waiting-list') && (
            <Col xs={24} md={10}>
              <WaitingList
                loading={isActiveWaitingListLoading}
                waitingList={waitingList}
              />
            </Col>
          )}

          {can('update loyalty') && (
            <Col xs={24}>
              <LoyaltyProgramCard
                id={loyalty.id}
                icon='loyalty.svg'
                type={loyalty.type_name}
                isLive={loyalty.is_live}
                title={`dashboard.social.loyalty-program`}
                totalEngagement={loyalty.total_engagement}
                totalUsed={loyalty.total_used}
                loyaltyOfferAmount={loyalty.offer_amount}
                loyaltyProducts={loyalty.products}
              />
            </Col>
          )}
        </AppRowContainer>
      </Col>
    </AppRowContainer>
  ) : (
    <DashboardSkeleton />
  );
};

export default Dashboard;
