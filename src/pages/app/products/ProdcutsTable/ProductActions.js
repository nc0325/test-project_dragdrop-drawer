import React from 'react';
import {useDispatch} from 'react-redux';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {Button, Menu, Dropdown, Modal} from 'antd';
import {MoreOutlined} from '@ant-design/icons';
import {showEditProductModal} from '../../../../features/editProductModal/editProductModalSlice';
import {deleteProduct} from '../../../../features/products/productsSlice';
import {useHasPermissions} from '../../../../hooks/useHasPermissions';

const ProductActions = ({productId}) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const can = useHasPermissions();

  const handleEditProduct = () => {
    dispatch(showEditProductModal(productId));
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      icon: '',
      title: messages['common.are-you-sure'],
      okText: messages['common.yes'],
      okType: 'danger',
      cancelText: messages['common.no'],
      onOk() {
        dispatch(deleteProduct(productId));
      },
    });
  };

  const menu = (
    <Menu>
      {can('update product') && (
        <Menu.Item
          key='edit'
          style={{fontSize: 14}}
          onClick={handleEditProduct}>
          {messages['common.edit']}
        </Menu.Item>
      )}

      {can('delete product') && (
        <Menu.Item
          key='delete'
          style={{fontSize: 14}}
          onClick={showDeleteConfirm}>
          {messages['common.delete']}
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type='circle'>
          <MoreOutlined />
        </Button>
      </Dropdown>
    </>
  );
};
export default ProductActions;

ProductActions.propTypes = {
  productId: PropTypes.string,
};
