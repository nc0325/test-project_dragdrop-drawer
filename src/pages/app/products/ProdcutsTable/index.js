import React from 'react';
import moment from 'moment';
import {Tag} from 'antd';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import ProductActions from './ProductActions';
import {useHasPermissions} from '../../../../hooks/useHasPermissions';

const ProdcutsTable = ({products, loading}) => {
  const {messages} = useIntl();
  const can = useHasPermissions();

  const columns = [
    {
      title: messages['products.product-name'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: messages['common.description'],
      dataIndex: 'description',
      key: 'description',
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

  if (can('update product') || can('delete product')) {
    columns.push({
      title: messages['common.actions'],
      dataIndex: 'actions',
      key: 'actions',
      className: 'user-table-actions',
      fixed: 'right',
      render: (_, product) => <ProductActions productId={product.id} />,
    });
  }
  return (
    <AppTableContainer
      className='user-table'
      hoverColor
      data={products}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default ProdcutsTable;

ProdcutsTable.defaultProps = {
  products: [],
};

ProdcutsTable.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
};
