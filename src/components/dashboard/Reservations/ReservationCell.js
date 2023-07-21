import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {Button, List, Space, Typography, Tooltip, Divider} from 'antd';
import {
  confirmActiveReservations,
  attendActiveReservations,
} from '../../../features/activeReservations/activeReservationsSlice';
import './index.style.less';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const ReservationCell = ({id, reservation}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const handleConfirmReservation = () => {
    dispatch(confirmActiveReservations(id));
  };

  const handleAttendReservation = () => {
    dispatch(attendActiveReservations(id));
  };

  return (
    <List.Item className='doctor-cell'>
      <div className='doctor-content'>
        <h5>
          <Space size={1} wrap split={<Divider type='vertical' />}>
            <Typography.Text>{reservation.customer.phone}</Typography.Text>
            <Tooltip
              title={`${reservation.first_name} ${reservation.last_name}`}>
              <Typography.Text>{reservation.first_name}</Typography.Text>
            </Tooltip>
            <Typography.Text>
              {reservation.guests} {messages['common.guests']}
            </Typography.Text>
          </Space>
        </h5>
      </div>
      {can('update reservation') && (
        <div className='doctor-action'>
          <Space>
            {reservation.status === 1 ? (
              <Button
                onClick={handleConfirmReservation}
                className='btn-secondary-outline'>
                {messages['common.confirm']}
              </Button>
            ) : reservation.status === 2 ? (
              <Button onClick={handleAttendReservation} type='primary'>
                {messages['common.attended']}
              </Button>
            ) : (
              ''
            )}
          </Space>
        </div>
      )}
    </List.Item>
  );
};

export default ReservationCell;

ReservationCell.propTypes = {
  id: PropTypes.string,
  reservation: PropTypes.object,
};
