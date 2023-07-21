import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Space, Button} from 'antd';
import {useIntl} from 'react-intl';
import {confirmReservation} from '../../../../features/reservations/reservationsSlice';
import {useHasPermissions} from '../../../../hooks/useHasPermissions';

const TableActions = ({reservation}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const handleConfirmReservation = () => {
    dispatch(confirmReservation(reservation.id));
  };

  return (
    <Space>
      {can('update reservation') && (
        <Button
          className='btn-secondary-outline'
          onClick={handleConfirmReservation}>
          {messages['common.confirm']}
        </Button>
      )}
    </Space>
  );
};

export default TableActions;

TableActions.propTypes = {
  reservation: PropTypes.object,
};
