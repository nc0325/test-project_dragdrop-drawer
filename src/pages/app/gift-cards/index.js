import React, {useState, useEffect} from 'react';
import GiftCardsTable from './GiftCardsTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getGiftCards, reset} from '../../../features/gift-card/giftCardSlice';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';

const GiftCards = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {giftCards, giftCardsCount, isLoading} = useSelector(
    (state) => state.giftCard,
  );

  const onPageChange = (page) => {
    setPage(page);
    dispatch(getGiftCards({page}));
  };

  useEffect(() => {
    dispatch(getGiftCards({}));
    return () => dispatch(reset());
  }, []);

  return (
    <>
      <AppPageMetadata title='Gift cards' />
      <AppsContainer
        title={messages['common.gift-cards']}
        fullView
        type='bottom'>
        <AppsContent
          key={'wrap1'}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <GiftCardsTable loading={isLoading} giftCards={giftCards} />
        </AppsContent>
        <AppsFooter>
          <AppsPagination
            key={'wrap2'}
            className='account-footer-pagination'
            pageSize={20}
            count={giftCardsCount}
            page={page}
            onChange={onPageChange}
          />
        </AppsFooter>
      </AppsContainer>
    </>
  );
};

export default GiftCards;
