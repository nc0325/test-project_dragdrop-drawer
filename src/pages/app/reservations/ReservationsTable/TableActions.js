import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Space, Button, Popconfirm} from 'antd';
import {useIntl} from 'react-intl';
import {
  confirmReservation,
  attendReservation,
  deleteReservation,
} from '../../../../features/reservations/reservationsSlice';
import {useHasPermissions} from '../../../../hooks/useHasPermissions';

const TableActions = ({reservation}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const handleConfirmReservation = () => {
    dispatch(confirmReservation(reservation.id));
  };

  const handleAttendReservation = () => {
    dispatch(attendReservation(reservation.id));
  };

  const handleDeleteReservation = () => {
    dispatch(deleteReservation(reservation.id));
  };

  return (
    <Space>
      {reservation.status === 1
        ? can('update reservation') && (
            <Button
              className='btn-secondary-outline'
              onClick={handleConfirmReservation}>
              {messages['common.confirm']}
            </Button>
          )
        : reservation.status === 2
        ? can('update reservation') && (
            <Button onClick={handleAttendReservation} type='primary'>
              {messages['common.attended']}
            </Button>
          )
        : ''}

      {can('delete reservation') && (
        <Popconfirm
          onConfirm={handleDeleteReservation}
          title={messages['common.are-you-sure']}
          okText={messages['common.yes']}
          cancelText={messages['common.no']}>
          <Button className='btn-primary-outline'>
            {messages['common.delete']}
          </Button>
        </Popconfirm>
      )}
    </Space>
  );
};

export default TableActions;

TableActions.propTypes = {
  reservation: PropTypes.object,
};
