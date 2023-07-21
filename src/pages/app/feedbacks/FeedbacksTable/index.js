import React from 'react';
import moment from 'moment';
import {Tag, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

const FeedbacksTable = ({feedbacks, loading}) => {
  const {messages} = useIntl();

  const columns = [
    {
      title: messages['common.phone'],
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => <span>{customer.phone}</span>,
    },
    {
      title: messages['common.customer-rank'],
      dataIndex: 'customer',
      key: 'customer',
      render: ({rank, rank_description}) => (
        <Tooltip title={rank_description}>
          <span style={{fontSize: '24px'}}>{rank}</span>
        </Tooltip>
      ),
    },
    {
      title: messages['common.rating'],
      dataIndex: 'rating_name',
      key: 'rating_name',
    },
    {
      title: messages['common.reason'],
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => <span>{reason?.option}</span>,
    },
    {
      title: messages['common.createdAt'],
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
      data={feedbacks}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default FeedbacksTable;

FeedbacksTable.defaultProps = {
  feedbacks: [],
};

FeedbacksTable.propTypes = {
  feedbacks: PropTypes.array,
  loading: PropTypes.bool,
};
