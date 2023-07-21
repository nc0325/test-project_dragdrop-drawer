import React, {useState, useEffect, useCallback} from 'react';
import ProdcutsTable from './ProdcutsTable';
import {debounce} from 'lodash';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {
  reset,
  resetProducts,
  getProducts,
} from '../../../features/products/productsSlice';
import {hideEditProductModal} from '../../../features/editProductModal/editProductModalSlice';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import {Input, Button, Modal} from 'antd';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import ProductForm from './ProductForm';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const Products = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const can = useHasPermissions();
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const delayedDispatchGetProducts = useCallback(
    debounce((q) => dispatch(getProducts({q})), 500),
    [],
  );

  const {
    products,
    productsCount,
    isProductsLoading,
    isDeleteSuccess,
    isCreateSuccess,
  } = useSelector((state) => state.products);

  const {isVisible: isVisibleEditProductModal} = useSelector(
    (state) => state.editProductModal,
  );

  const onPageChange = (page) => {
    setPage(page);
    dispatch(getProducts({page, q: searchQuery}));
  };

  const onProductSearch = (e) => {
    setSearchQuery(e.target.value);
    delayedDispatchGetProducts(e.target.value);
    setPage(1);
  };

  const showAddProductModal = () => {
    setIsAddProductModalVisible(true);
  };

  const handleAddProductModalOk = () => {
    setIsAddProductModalVisible(false);
  };

  const handleAddProductModalCancel = () => {
    setIsAddProductModalVisible(false);
  };

  const handleEditProductModalOk = () => {
    dispatch(hideEditProductModal());
    dispatch(reset());
  };

  const handleEditProductModalCancel = () => {
    dispatch(hideEditProductModal());
    dispatch(reset());
  };

  useEffect(() => {
    dispatch(getProducts({}));
    return () => dispatch(resetProducts());
  }, []);

  useEffect(() => {
    if (isDeleteSuccess || isCreateSuccess) {
      dispatch(getProducts({}));

      if (isCreateSuccess) {
        setIsAddProductModalVisible(false);
      }
    }
  }, [isDeleteSuccess, isCreateSuccess]);

  return (
    <>
      <AppPageMetadata title='products' />
      <AppsContainer
        title={messages['sidebar.ecommerce.products']}
        fullView
        type='bottom'>
        <AppsHeader key={'wrap'}>
          <div className='user-header'>
            <div className='user-header-input-view'>
              <Input
                id='user-name'
                placeholder={messages['common.search']}
                type='search'
                onChange={onProductSearch}
              />
            </div>
            {can('create product') && (
              <div className='user-header-right'>
                <Button type='primary' onClick={showAddProductModal}>
                  {messages['products.add-product']}
                </Button>
              </div>
            )}
          </div>
        </AppsHeader>

        <AppsContent
          key={'wrap1'}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <ProdcutsTable loading={isProductsLoading} products={products} />
        </AppsContent>
        <AppsFooter>
          <AppsPagination
            key={'wrap2'}
            className='user-footer-pagination'
            pageSize={20}
            count={productsCount}
            page={page}
            onChange={onPageChange}
          />
        </AppsFooter>
      </AppsContainer>
      <Modal
        key='add'
        title={messages['products.add-product']}
        visible={isAddProductModalVisible}
        onOk={handleAddProductModalOk}
        footer={false}
        onCancel={handleAddProductModalCancel}>
        <ProductForm type='add' />
      </Modal>
      <Modal
        key='edit'
        title={messages['products.edit-product']}
        visible={isVisibleEditProductModal}
        onOk={handleEditProductModalOk}
        footer={false}
        onCancel={handleEditProductModalCancel}>
        <ProductForm type='edit' />
      </Modal>
    </>
  );
};

export default Products;
