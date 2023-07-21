import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Form, Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {register, reset} from '../../../features/auth/authSlice';
import ShowValidationErrors from '../../../shared/components/ShowValidationErrors';

const SignupJwtAuth = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isLoading, errors, isSuccess} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate('/signin');
    }
  }, [isSuccess]);

  const onFinish = (userData) => {
    let formData = new FormData();

    formData.append('business_name[0][locale]', 'ar');
    formData.append('business_name[0][data]', userData.business_name_ar);
    formData.append('business_name[1][locale]', 'en');
    formData.append('business_name[1][data]', userData.business_name_en);

    delete userData.business_name_ar;
    delete userData.business_name_en;

    Object.keys(userData).forEach(
      (key) => userData[key] && formData.append(key, userData[key]),
    );

    dispatch(register(formData));
  };

  return (
    <div className='signup'>
      <div className='signup-content'>
        <ShowValidationErrors errors={errors} />
        <Form
          layout='vertical'
          className='signup-form'
          name='basic'
          onFinish={onFinish}>
          <Form.Item
            name='business_name_ar'
            label={`${messages['common.accountName']} (${messages['common.ar']})`}
            rules={[
              {
                required: true,
                message: messages['validation.nameRequired'],
              },
            ]}>
            <Input placeholder={messages['common.accountName']} />
          </Form.Item>

          <Form.Item
            name='business_name_en'
            label={`${messages['common.accountName']} (${messages['common.en']})`}
            rules={[
              {
                required: true,
                message: messages['validation.nameRequired'],
              },
            ]}>
            <Input dir='ltr' placeholder={messages['common.accountName']} />
          </Form.Item>
          <Form.Item
            label={messages['common.name']}
            name='name'
            className='form-field'
            rules={[
              {required: true, message: messages['validation.nameRequired']},
            ]}>
            <Input placeholder={messages['common.name']} />
          </Form.Item>
          <Form.Item
            label={messages['common.email']}
            name='email'
            className='form-field'
            rules={[
              {required: true, message: messages['validation.emailRequired']},
            ]}>
            <Input type='email' placeholder={messages['common.email']} />
          </Form.Item>
          <Form.Item
            label={messages['common.phone']}
            name='phone'
            className='form-field'
            rules={[
              {required: true, message: messages['validation.phoneRequired']},
            ]}>
            <Input type='tel' placeholder={messages['common.phone']} />
          </Form.Item>
          <Form.Item
            label={messages['common.location']}
            name='location'
            className='form-field'
            rules={[
              {
                required: true,
                message: messages['validation.locationRequired'],
              },
            ]}>
            <Input type='url' placeholder='https://xxxx.xxx' />
          </Form.Item>
          <Form.Item
            label={messages['common.password']}
            name='password'
            className='form-field'
            rules={[
              {
                required: true,
                message: messages['validation.passwordRequired'],
              },
            ]}>
            <Input.Password placeholder={messages['common.password']} />
          </Form.Item>
          <Form.Item
            label={messages['common.retypePassword']}
            name='password_confirmation'
            className='form-field'
            rules={[
              {
                required: true,
                message: messages['validation.reTypePassword'],
              },
            ]}>
            <Input.Password placeholder={messages['common.retypePassword']} />
          </Form.Item>

          <div className='form-btn-field'>
            <Button
              loading={isLoading}
              type='primary'
              htmlType='submit'
              className='signup-btn'
              block>
              <IntlMessages id='common.signup' />
            </Button>
          </div>
          <div className='form-field-action'>
            <span className='signup-text-grey'>
              <IntlMessages id='common.alreadyHaveAccount' />
            </span>
            <Link to='/signIn' className='underlineNone colorTextPrimary'>
              <IntlMessages id='common.signIn' />
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupJwtAuth;
