import React from 'react';
import {useIntl} from 'react-intl';
import AppCard from '../../../@crema/core/AppCard';
import WaitingListCell from './WaitingListCell';
import PropTypes from 'prop-types';
import './index.style.less';
import {List, Spin} from 'antd';
import AppScrollbar from '../../../@crema/core/AppScrollbar';

const WaitingList = ({loading, waitingList}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      className='no-card-space-ltr-rtl'
      title={messages['common.waiting-list']}>
      <Spin spinning={loading}>
        <AppScrollbar className='top-dr-scrollbar'>
          <List
            dataSource={waitingList ?? []}
            renderItem={(w) => (
              <>
                <WaitingListCell
                  key={w.id}
                  id={w.id}
                  phone={w.customer.phone}
                />
              </>
            )}
          />
        </AppScrollbar>
      </Spin>
    </AppCard>
  );
};

export default WaitingList;

WaitingList.defaultProps = {
  waitingList: [],
};

WaitingList.propTypes = {
  waitingList: PropTypes.array,
  loading: PropTypes.bool,
};
