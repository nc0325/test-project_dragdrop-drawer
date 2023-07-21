import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Form, Input, Spin} from 'antd';
import {AppRowContainer} from '../../../../../@crema';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {updateUserPassword} from '../../../../../features/userInfo/userInfoSlice';

const ChangePassword = () => {
  const {messages} = useIntl();
  const formRef = useRef();
  const dispatch = useDispatch();

  const {isSuccess, isLoading} = useSelector((state) => state.userInfo);

  const onFinish = (values) => {
    dispatch(updateUserPassword(values));
  };

  useEffect(() => {
    if (isSuccess) {
      formRef.current.resetFields();
    }
  }, [isSuccess]);

  return (
    <Spin spinning={isLoading}>
      <Form
        layout='vertical'
        ref={formRef}
        className='user-profile-form'
        initialValues={{remember: true}}
        onFinish={onFinish}>
        <h3 className='user-profile-form-title'>
          <IntlMessages id='userProfile.changePassword' />
        </h3>
        <AppRowContainer gutter={16}>
          <Col xs={24}>
            <Form.Item
              label={messages['common.oldPassword']}
              name='password'
              rules={[
                {
                  required: true,
                  message: messages['validation.passwordRequired'],
                },
              ]}>
              <Input.Password placeholder={messages['common.oldPassword']} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={messages['common.newPassword']}
              name='new_password'
              rules={[
                {
                  required: true,
                  message: messages['validation.passwordRequired'],
                },
              ]}>
              <Input.Password placeholder={messages['common.newPassword']} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={messages['common.retypePassword']}
              name='new_password_confirmation'
              rules={[
                {
                  required: true,
                  message: messages['validation.passwordRequired'],
                },
                // ({getFieldValue}) => ({
                //   validator(rule, value) {
                //     if (!value || getFieldValue('password') == value) {
                //       return Promise.resolve();
                //     }
                //     return Promise.reject(
                //       messages['common.not-matched-password'],
                //     );
                //   },
                // }),
              ]}>
              <Input.Password placeholder={messages['common.retypePassword']} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item shouldUpdate className='user-profile-group-btn'>
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

export default ChangePassword;
