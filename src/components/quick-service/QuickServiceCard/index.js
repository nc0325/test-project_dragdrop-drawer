import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {Form, Button, Input} from 'antd';
import AppCard from '../../../@crema/core/AppCard';
import {FaPaperPlane} from 'react-icons/fa';
import {offerProviderQuickService} from '../../../features/offerProviders/offerProvidersSlice';
import './index.style.less';

const QuickServiceCard = ({id, icon, heading, isLoading, isSuccess}) => {
  const {messages} = useIntl();
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const data = {phone: '5' + values.phone};
    dispatch(offerProviderQuickService({id, data}));
  };

  if (isSuccess) {
    formRef?.current?.resetFields();
  }

  return (
    <AppCard className='quick-service-card'>
      <div className='quick-service-row'>
        <img src={`/assets/icons/${icon}`} className='quick-service-avatar' />

        <div className='quick-service-content'>
          <p>{heading}</p>

          <Form ref={formRef} onFinish={handleFormSubmit}>
            <div className='sub-form-field-row'>
              <div className='form-field'>
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
                    className='sub-input'
                    placeholder={messages['common.phone']}
                  />
                </Form.Item>
              </div>
              <div className='form-btn-field'>
                <Button
                  loading={isLoading}
                  type='primary'
                  icon={<FaPaperPlane />}
                  htmlType='submit'
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </AppCard>
  );
};

export default QuickServiceCard;

QuickServiceCard.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  heading: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
};
