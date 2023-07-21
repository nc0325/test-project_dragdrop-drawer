import React from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import TableActions from './TableActions';

const PendingReservationsTable = ({pendingReservations, loading}) => {
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
      data={pendingReservations}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default PendingReservationsTable;

PendingReservationsTable.defaultProps = {
  pendingReservations: [],
};

PendingReservationsTable.propTypes = {
  pendingReservations: PropTypes.array,
  loading: PropTypes.bool,
};
