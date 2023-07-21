import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import AppCard from '../../../@crema/core/AppCard';
import {FaCheck} from 'react-icons/fa';
import {Button, Form, Input, Alert} from 'antd';
import {checkCode} from '../../../features/check-code/checkCodeSlice';
import './index.style.less';

const CheckCode = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const checkCodeFormRef = useRef();

  const {data, isLoading, isSuccess} = useSelector((state) => state.checkCode);

  const handleCheckCodeFinish = (values) => {
    dispatch(checkCode(values));
  };

  if (isSuccess) {
    checkCodeFormRef?.current?.resetFields();
  }

  return (
    <AppCard
      heightFull
      className='sub-card'
      title={messages['dashboard.checkCode']}>
      {data && data.offer && (
        <Alert
          className='check-code-alert'
          key={data.offer}
          message={
            <div
              dangerouslySetInnerHTML={{
                __html: data.offer.replace('\n', '<br>').replace(/\*/g, ''),
              }}></div>
          }
          type='success'
          closable
          showIcon={false}
        />
      )}

      <Form
        ref={checkCodeFormRef}
        name='check-code'
        onFinish={handleCheckCodeFinish}>
        <div className='sub-form-field-row'>
          <div className='form-field'>
            <Form.Item
              name='code'
              rules={[
                {required: true, message: messages['validation.codeRequired']},
              ]}>
              <Input
                inputMode='numeric'
                className='sub-input'
                placeholder={messages['common.code']}
              />
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
  );
};

export default CheckCode;
