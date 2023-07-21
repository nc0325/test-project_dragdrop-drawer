import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Form, Input, Spin, Switch, Select} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import {useIntl} from 'react-intl';
import {AppRowContainer} from '../../../../@crema';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {
  getAccountData,
  updateAccount,
  testAccountFeedbackMessage,
} from '../../../../features/account/accountSlice';
import './index.style.less';

const FeedbacksSettings = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const formRef = useRef();
  const testFeedbackMessageFormRef = useRef();

  const {account, isLoading, isSuccess, isLoadingTestFeedbackMessage} =
    useSelector((state) => state.account);

  const onFinish = (values) => {
    delete values.name;

    let formData = new FormData();

    if (values.feedback_message_ar) {
      formData.append('feedback_message[0][locale]', 'ar');
      formData.append('feedback_message[0][data]', values.feedback_message_ar);
      delete values.feedback_message_ar;
    }

    if (values.feedback_message_en) {
      formData.append('feedback_message[1][locale]', 'en');
      formData.append('feedback_message[1][data]', values.feedback_message_en);
      delete values.feedback_message_en;
    }

    Object.keys(values).forEach(
      (key) => values[key] && formData.append(key, values[key]),
    );

    formData.append('is_feedback_enabled', values.is_feedback_enabled);

    dispatch(updateAccount(formData));
  };

  const handleTestFeedbackMessageFinish = (values) => {
    const data = {phone: '5' + values.phone};
    dispatch(testAccountFeedbackMessage(data));
  };

  const handleTestFeedbackMessageButtonClick = () => {
    testFeedbackMessageFormRef.current.submit();
  };

  useEffect(() => {
    dispatch(getAccountData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const values = {
        feedback_message: account.feedback_message,
        is_feedback_enabled: account.is_feedback_enabled,
        feedback_message_send_after: Number(
          account.feedback_message_send_after,
        ),
      };

      Object.keys(account.translations).forEach((locale) => {
        Object.keys(account.translations[locale]).forEach((field) => {
          values[`${field}_${locale}`] = account.translations[locale][field];
        });
      });

      formRef.current.setFieldsValue(values);
    }
  }, [isSuccess, account]);

  return (
    <Spin spinning={isLoading}>
      <Form
        layout='vertical'
        ref={formRef}
        className='user-profile-form feedback-setting-form'
        initialValues={{remember: true}}
        onFinish={onFinish}>
        <h3 className='user-profile-form-title'>
          <IntlMessages id='common.feedback-settings' />
        </h3>
        <AppRowContainer gutter={16}>
          <Col xs={24}>
            <Form.Item
              valuePropName='checked'
              label={messages['common.enable-feedback-message']}
              name='is_feedback_enabled'>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={`${messages['common.feedback-message']} (${messages['common.ar']})`}
              name='feedback_message_ar'>
              <Input.TextArea className='feedback-message-textarea' />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={`${messages['common.feedback-message']} (${messages['common.en']})`}
              name='feedback_message_en'>
              <Input.TextArea dir='ltr' className='feedback-message-textarea' />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={messages['common.send-feedback-after']}
              name='feedback_message_send_after'>
              <Select>
                <Select.Option value={30}>
                  {messages['common.send-feedback-after-30min-1h']}
                </Select.Option>
                <Select.Option value={90}>
                  {messages['common.send-feedback-after-1h30min-2h']}
                </Select.Option>
                <Select.Option value={690}>
                  {messages['common.send-feedback-after-12h']}
                </Select.Option>
                <Select.Option value={1410}>
                  {messages['common.send-feedback-after-24h']}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Form
            layout='inline'
            ref={testFeedbackMessageFormRef}
            onFinish={handleTestFeedbackMessageFinish}>
            <Col xs={18}>
              <Form.Item
                extra={messages['common.save-to-test-feedback-message']}
                label={messages['common.test-feedback-message']}
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
                  loading={isLoadingTestFeedbackMessage}
                  onClick={handleTestFeedbackMessageButtonClick}>
                  {messages['common.send']}
                </Button>
              </Form.Item>
            </Col>
          </Form>

          <Col xs={24}>
            <Form.Item
              shouldUpdate
              className='user-profile-group-btn save-feedback-btn'>
              <Button type='primary' htmlType='submit'>
                {messages['common.save']}
              </Button>
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Spin>
  );
};

export default FeedbacksSettings;
