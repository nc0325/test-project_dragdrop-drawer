import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {Button, List, Space, Popconfirm} from 'antd';
import {
  updateActiveWaitingList,
  deleteActiveWaitingList,
} from '../../../features/activeWaitingList/activeWaitingListSlice';
import './index.style.less';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const WaitingListCell = ({id, phone}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const handleUpdateWaitingList = () => {
    dispatch(updateActiveWaitingList(id));
  };

  const handleDeleteWaitingList = () => {
    dispatch(deleteActiveWaitingList(id));
  };

  return (
    <List.Item className='doctor-cell item-hover'>
      <div className='doctor-content'>
        <h5>{phone}</h5>
      </div>
      <div className='doctor-action'>
        <Space>
          {can('update waiting-list') && (
            <Button
              onClick={handleUpdateWaitingList}
              className='btn-secondary-outline'>
              {messages['common.waiting-in']}
            </Button>
          )}

          {can('delete waiting-list') && (
            <Popconfirm
              onConfirm={handleDeleteWaitingList}
              title={messages['common.are-you-sure']}
              okText={messages['common.yes']}
              cancelText={messages['common.no']}>
              <Button className='btn-primary-outline'>
                {messages['common.delete']}
              </Button>
            </Popconfirm>
          )}
        </Space>
      </div>
    </List.Item>
  );
};

export default WaitingListCell;

WaitingListCell.propTypes = {
  id: PropTypes.string,
  phone: PropTypes.string,
};
