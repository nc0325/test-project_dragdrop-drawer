import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Form, Input, Spin} from 'antd';
import {useIntl} from 'react-intl';
import {AppRowContainer} from '../../../../../@crema';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import {
  getAccountData,
  updateAccount,
} from '../../../../../features/account/accountSlice';
import './index.style.less';

const Account = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const formRef = useRef();

  const {account, isLoading, isSuccess} = useSelector((state) => state.account);

  const onFinish = (values) => {
    let formData = new FormData();

    formData.append('name[0][locale]', 'ar');
    formData.append('name[0][data]', values.name_ar);
    formData.append('name[1][locale]', 'en');
    formData.append('name[1][data]', values.name_en);

    delete values.name_ar;
    delete values.name_en;

    Object.keys(values).forEach(
      (key) => values[key] && formData.append(key, values[key]),
    );

    dispatch(updateAccount(formData));
  };

  useEffect(() => {
    dispatch(getAccountData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const values = {
        phone: account.phone,
        location: account.location,
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
        className='user-profile-form'
        initialValues={{remember: true}}
        onFinish={onFinish}>
        <h3 className='user-profile-form-title'>
          <IntlMessages id='userProfile.account' />
        </h3>
        <AppRowContainer gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name='name_ar'
              label={`${messages['common.accountName']} (${messages['common.ar']})`}
              rules={[
                {
                  required: true,
                  message: messages['validation.nameRequired'],
                },
              ]}>
              <Input placeholder={messages['common.accountName']} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name='name_en'
              label={`${messages['common.accountName']} (${messages['common.en']})`}
              rules={[
                {
                  required: true,
                  message: messages['validation.nameRequired'],
                },
              ]}>
              <Input dir='ltr' placeholder={messages['common.accountName']} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={messages['common.phone']}
              name='phone'
              rules={[
                {required: true, message: messages['validation.phoneRequired']},
              ]}>
              <Input placeholder={messages['common.phone']} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={messages['common.location']}
              name='location'
              className='form-field'>
              <Input type='url' placeholder='https://xxxx.xxx' />
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

export default Account;
