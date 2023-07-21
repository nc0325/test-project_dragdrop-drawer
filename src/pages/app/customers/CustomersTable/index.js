import React from 'react';
import moment from 'moment';
import {Tag, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const CustomersTable = ({customers, loading}) => {
  const {messages} = useIntl();

  const columns = [
    {
      title: messages['common.phone'],
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: messages['common.customer-rank'],
      dataIndex: 'rank',
      key: 'rank',
      render: (_, {rank, rank_description}) => (
        <Tooltip title={rank_description}>
          <span style={{fontSize: '24px'}}>{rank}</span>
        </Tooltip>
      ),
    },
    {
      title: messages['common.points'],
      dataIndex: 'total_points',
      key: 'total_points',
    },
    {
      title: messages['common.return-visits'],
      dataIndex: 'returns',
      key: 'returns',
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
      data={customers}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default CustomersTable;

CustomersTable.defaultProps = {
  customers: [],
};

CustomersTable.propTypes = {
  customers: PropTypes.array,
  loading: PropTypes.bool,
};
