import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Form, Input, Spin} from 'antd';
import {useIntl} from 'react-intl';
import {
  getProduct,
  updateProduct,
  createProduct,
} from '../../../features/products/productsSlice';
import {hideEditProductModal} from '../../../features/editProductModal/editProductModalSlice';

const ProductForm = ({type}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const formRef = useRef();

  const {product, isLoading, isUpdateSuccess, isCreateSuccess} = useSelector(
    (state) => state.products,
  );

  const {productId} = useSelector((state) => state.editProductModal);

  const onFinish = (values) => {
    if (type === 'edit') {
      dispatch(updateProduct({id: productId, data: values}));
    } else {
      dispatch(createProduct(values));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (type === 'edit' && productId) {
      dispatch(getProduct(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(hideEditProductModal());
    }

    formRef?.current?.resetFields();
  }, [isUpdateSuccess, isCreateSuccess]);

  if (product) {
    formRef?.current?.setFieldsValue({
      name: product.name,
      description: product.description,
      external_id: product.external_id,
    });
  }

  return (
    <Spin spinning={isLoading}>
      <Form
        ref={formRef}
        layout='vertical'
        className='edit-customer-form'
        name='basic'
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          name='name'
          label={messages['products.product-name']}
          className='form-field'
          rules={[
            {required: true, message: messages['validation.nameRequired']},
          ]}>
          <Input placeholder={messages['products.product-name']} />
        </Form.Item>
        <Form.Item
          name='description'
          label={messages['common.description']}
          className='form-field'>
          <Input.TextArea placeholder={messages['common.description']} />
        </Form.Item>
        <Form.Item
          name='external_id'
          label={messages['common.externalId']}
          className='form-field'>
          <Input placeholder={messages['common.externalId']} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {messages['common.save']}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ProductForm;

ProductForm.propTypes = {
  type: PropTypes.string.isRequired,
};
