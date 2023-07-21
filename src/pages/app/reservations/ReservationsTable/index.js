import React from 'react';
import moment from 'moment';
import {Tag} from 'antd';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import TableActions from './TableActions';

const ReservationsTable = ({reservations, loading}) => {
  const {messages} = useIntl();

  const columns = [
    {
      title: messages['common.name'],
      dataIndex: 'name',
      key: 'name',
      render: (_, reservation) => (
        <span>{`${reservation.first_name} ${reservation.last_name}`}</span>
      ),
    },
    {
      title: messages['common.phone'],
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => <span>{customer.phone}</span>,
    },
    {
      title: messages['common.guests'],
      dataIndex: 'guests',
      key: 'guests',
    },
    {
      title: messages['common.status'],
      dataIndex: 'status_name',
      key: 'status_name',
      render: (status_name) => <Tag color='blue'>{status_name}</Tag>,
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
    {
      title: messages['common.actions'],
      dataIndex: 'actions',
      key: 'actions',
      render: (_, reservation) => <TableActions reservation={reservation} />,
    },
  ];
  return (
    <AppTableContainer
      className='reservation-table'
      hoverColor
      data={reservations}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default ReservationsTable;

ReservationsTable.defaultProps = {
  reservations: [],
};

ReservationsTable.propTypes = {
  reservations: PropTypes.array,
  loading: PropTypes.bool,
};
