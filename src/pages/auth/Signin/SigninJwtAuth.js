import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {Button, Form, Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ShowValidationErrors from '../../../shared/components/ShowValidationErrors';
import {login} from '../../../features/auth/authSlice';

const SignInJwtAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isLoading, errors, user} = useSelector((state) => state.auth);

  // const onGoToForgetPassword = () => {
  //   navigate('/forget-password', {tab: 'jwtAuth'});
  // };

  // function onRememberMe(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const {messages} = useIntl();

  const onFinish = (userData) => {
    dispatch(login(userData));
  };

  return (
    <div className='sign'>
      <div className='sign-content'>
        <ShowValidationErrors errors={errors} />
        <Form className='sign-form' name='basic' onFinish={onFinish}>
          <Form.Item
            name='email'
            className='form-field'
            rules={[
              {required: true, message: messages['validation.emailRequired']},
            ]}>
            <Input type='email' placeholder={messages['common.email']} />
          </Form.Item>

          <Form.Item
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

          <div className='form-btn-field'>
            <Button
              loading={isLoading}
              type='primary'
              htmlType='submit'
              className='sign-btn'
              block>
              <IntlMessages id='common.login' />
            </Button>
          </div>

          <div className='form-field-action'>
            <span className='sign-text-grey'>
              <IntlMessages id='common.dontHaveAccount' />
            </span>
            <Link to='/signup' className='underlineNone colorTextPrimary'>
              <IntlMessages id='common.signup' />
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInJwtAuth;
