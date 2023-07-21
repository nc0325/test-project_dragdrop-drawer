import React from 'react';
import moment from 'moment';
import {Tag} from 'antd';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const GiftCardsTable = ({giftCards, loading}) => {
  const {messages} = useIntl();

  const columns = [
    {
      title: messages['common.to'],
      dataIndex: 'receiver',
      key: 'receiver',
      render: (receiver) => <span color='green'>{receiver.phone}</span>,
    },
    {
      title: messages['dashboard.social.type'],
      dataIndex: 'type_name',
      key: 'type_name',
      render: (type_name) =>
        type_name === 'fixed' ? (
          <Tag color='blue'>{type_name}</Tag>
        ) : (
          <Tag color='orange'>{type_name}</Tag>
        ),
    },
    {
      title: messages['dashboard.gift-amount'],
      dataIndex: 'offer_amount',
      key: 'offer_amount',
    },
    {
      title: messages['common.join-date'],
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <Tag color='green'>
          {moment(created_at).locale('en').format('YYYY-MM-DD')}
        </Tag>
      ),
    },
  ];
  return (
    <AppTableContainer
      className='user-table'
      data={giftCards}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default GiftCardsTable;

GiftCardsTable.defaultProps = {
  giftCards: [],
};

GiftCardsTable.propTypes = {
  giftCards: PropTypes.array,
  loading: PropTypes.bool,
};
