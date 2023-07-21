import React, {useState, useEffect, useCallback} from 'react';
import CustomersTable from './CustomersTable';
import {debounce} from 'lodash';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomers, reset} from '../../../features/customers/customersSlice';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import {Input} from 'antd';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';

const Customers = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const delayedDispatchGetCustomers = useCallback(
    debounce((q) => dispatch(getCustomers({q})), 500),
    [],
  );

  const {customers, customersCount, isLoading} = useSelector(
    (state) => state.customers,
  );

  const onPageChange = (page) => {
    setPage(page);
    dispatch(getCustomers({page, q: searchQuery}));
  };

  const onCustomersSearch = (e) => {
    setSearchQuery(e.target.value);
    delayedDispatchGetCustomers(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(getCustomers({}));
    return () => dispatch(reset());
  }, []);

  return (
    <>
      <AppPageMetadata title='Customers' />
      <AppsContainer
        title={messages['common.customers']}
        fullView
        type='bottom'>
        <AppsHeader key={'wrap'}>
          <div className='account-header'>
            <div className='account-header-input-view'>
              <Input
                id='account-name'
                placeholder={messages['common.search']}
                type='search'
                onChange={onCustomersSearch}
              />
            </div>
          </div>
        </AppsHeader>

        <AppsContent
          key={'wrap1'}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <CustomersTable loading={isLoading} customers={customers} />
        </AppsContent>
        <AppsFooter>
          <AppsPagination
            key={'wrap2'}
            className='account-footer-pagination'
            pageSize={20}
            count={customersCount}
            page={page}
            onChange={onPageChange}
          />
        </AppsFooter>
      </AppsContainer>
    </>
  );
};

export default Customers;
