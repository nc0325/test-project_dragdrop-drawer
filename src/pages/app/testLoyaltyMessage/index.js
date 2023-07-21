import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Form, Input} from 'antd';
import {useIntl} from 'react-intl';
import {testAccountLoyaltyMessage} from '../../../features/account/accountSlice';
import './index.style.less';

const TestLoyaltyMessage = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const testLoyaltyMessageFormRef = useRef();

  const {isLoadingTestLoyaltyMessage} = useSelector((state) => state.account);

  const handleTestLoyaltyMessageFinish = (values) => {
    const data = {phone: '5' + values.phone};
    dispatch(testAccountLoyaltyMessage(data));
  };

  const handleTestLoyaltyMessageButtonClick = () => {
    testLoyaltyMessageFormRef.current.submit();
  };

  return (
    <Form
      layout='inline'
      ref={testLoyaltyMessageFormRef}
      onFinish={handleTestLoyaltyMessageFinish}>
      <Col xs={18}>
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
            style={{width: '100%', direction: 'ltr', textAlign: 'left'}}
            dir='ltr'
            prefix='05'
            inputMode='numeric'
            className='test-feedback-input'
            placeholder={messages['common.phone']}
          />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label='  '>
          <Button
            loading={isLoadingTestLoyaltyMessage}
            onClick={handleTestLoyaltyMessageButtonClick}>
            {messages['common.send']}
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default TestLoyaltyMessage;
