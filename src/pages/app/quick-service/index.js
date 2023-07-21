import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {Col} from 'antd';
import {getOfferProviders} from '../../../features/offerProviders/offerProvidersSlice';
import QuickServiceCard from '../../../components/quick-service/QuickServiceCard';
import QuickServiceSkeleton from '../../../components/quick-service/QuickServiceSkeleton';

const QuickService = () => {
  const dispatch = useDispatch();
  const {messages} = useIntl();

  const {offerProviders, isSuccess} = useSelector(
    (state) => state.offerProviders,
  );

  useEffect(() => {
    dispatch(getOfferProviders());
  }, []);

  return isSuccess ? (
    <AppRowContainer>
      {offerProviders.map((offerProvider) => (
        <Col xs={24} md={12} key={offerProvider.id}>
          <QuickServiceCard
            id={offerProvider.id}
            icon={offerProvider.icon}
            isSuccess={offerProvider.isSuccess}
            isLoading={offerProvider.isLoading}
            heading={
              messages[`dashboard.social.${offerProvider.provider_name}`]
            }
          />
        </Col>
      ))}
    </AppRowContainer>
  ) : (
    <QuickServiceSkeleton />
  );
};

export default QuickService;
