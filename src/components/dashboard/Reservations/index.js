import React from 'react';
import {useIntl} from 'react-intl';
import AppCard from '../../../@crema/core/AppCard';
import ReservationCell from './ReservationCell';
import PropTypes from 'prop-types';
import './index.style.less';
import {List, Spin} from 'antd';
import AppScrollbar from '../../../@crema/core/AppScrollbar';

const Reservations = ({loading, reservations}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      className='no-card-space-ltr-rtl'
      title={messages['common.reservations']}>
      <Spin spinning={loading}>
        <AppScrollbar className='top-dr-scrollbar'>
          <List
            dataSource={reservations ?? []}
            renderItem={(r) => (
              <>
                <ReservationCell key={r.id} id={r.id} reservation={r} />
              </>
            )}
          />
        </AppScrollbar>
      </Spin>
    </AppCard>
  );
};

export default Reservations;

Reservations.defaultProps = {
  reservations: [],
};

Reservations.propTypes = {
  reservations: PropTypes.array,
  loading: PropTypes.bool,
};
