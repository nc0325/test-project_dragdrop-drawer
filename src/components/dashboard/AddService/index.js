import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import AppCard from '../../../@crema/core/AppCard';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {FaCheck} from 'react-icons/fa';
import {Button, Form, Input, Checkbox, Modal, Space} from 'antd';
import {addService, reset} from '../../../features/add-service/addServiceSlice';
import {getActiveWaitingList} from '../../../features/activeWaitingList/activeWaitingListSlice';
import './index.style.less';
import {useEffect} from 'react';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const AddService = () => {
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();

  const addServiceFormRef = useRef();

  const {customer, isLoading, isSuccess} = useSelector(
    (state) => state.addService,
  );

  const handleAddServiceFinish = (values) => {
    dispatch(addService({...values, phone: `5${values.phone}`}));
  };

  const showCustomerModal = () => {
    setCustomerModalVisible(true);
  };

  const hideCustomerModal = () => {
    setCustomerModalVisible(false);
    dispatch(reset());
  };

  useEffect(() => {
    if (isSuccess) {
      const waitingList =
        addServiceFormRef?.current?.getFieldValue('waiting_list');

      if (waitingList && can('list waiting-list')) {
        dispatch(getActiveWaitingList());
      }

      addServiceFormRef?.current?.resetFields();
      showCustomerModal();
    }
  }, [isSuccess, addServiceFormRef]);

  return (
    <>
      <AppCard
        heightFull
        className='sub-card add-service-form'
        title={messages['dashboard.add-phone']}>
        <Form
          ref={addServiceFormRef}
          name='add-service'
          onFinish={handleAddServiceFinish}>
          <div className='sub-form-field-row'>
            <div className='form-field form-field-phone'>
              <Form.Item
                name='phone'
                rules={[
                  {
                    required: true,
                    message: messages['validation.phoneRequired'],
                  },
                  {
                    pattern: /^([0-9]{8})$/,
                    message: messages['validation.phonePattern'],
                  },
                ]}>
                <Input
                  dir='ltr'
                  prefix='05'
                  inputMode='numeric'
                  className='phone-input'
                  placeholder={messages['common.phone']}
                />
              </Form.Item>
            </div>
            {can('create waiting-list') && (
              <div className='form-field form-field-checkbox'>
                <Form.Item
                  name='waiting_list'
                  valuePropName='checked'
                  initialValue={false}>
                  <Checkbox>{messages['common.waiting-list']}</Checkbox>
                </Form.Item>
              </div>
            )}
            <div className='form-field form-field-checkbox'>
              <Form.Item
                name='english'
                valuePropName='checked'
                initialValue={false}>
                <Checkbox>English</Checkbox>
              </Form.Item>
            </div>

            <div className='form-btn-field'>
              <Button
                loading={isLoading}
                type='primary'
                className='sub-btn'
                htmlType='submit'>
                <FaCheck />
              </Button>
            </div>
          </div>
        </Form>
      </AppCard>
      <Modal
        title={<span>{messages['common.customer-rank']}</span>}
        footer={[
          <Button key='ok' type='primary' onClick={hideCustomerModal}>
            {messages['common.cancel']}
          </Button>,
        ]}
        visible={customerModalVisible}
        onOk={hideCustomerModal}
        onCancel={hideCustomerModal}>
        <AppRowContainer justify='center'>
          <Space align='center' direction='vertical'>
            <div style={{fontSize: '24px'}}>{customer?.rank}</div>
            <h3>{customer?.rank_description}</h3>
          </Space>
        </AppRowContainer>
      </Modal>
    </>
  );
};

export default AddService;
