import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  Form,
  Input,
  Button,
  Result,
  InputNumber,
  DatePicker,
  TimePicker,
} from 'antd';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import PublicWrapper from '../PublicWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import './index.style.less';
import {getPublicAccountData} from '../../../features/account/accountSlice';
import {bookReservation} from '../../../features/bookReservation/bookRerservationSlice';

const Signin = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {messages} = useIntl();

  const {isLoading, isError, account} = useSelector((state) => state.account);

  const {isSuccess, isLoading: isLoadingBookReservation} = useSelector(
    (state) => state.bookReservation,
  );

  const onFinish = (values) => {
    dispatch(
      bookReservation({
        id,
        data: {
          ...values,
          phone: '5' + values.phone,
          date: values.date.locale('en').format('YYYY-MM-DD'),
          time: values.time.locale('en').format('HH:mm'),
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(getPublicAccountData(id));
  }, []);

  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
  }, [isError]);

  return (
    <PublicWrapper
      loading={isLoading}
      title={`${messages['common.reservations']}${
        account ? ` | ${account.name}` : ''
      }`}>
      <AppPageMetadata title='Reservations' />
      {isSuccess ? (
        <Result
          status='success'
          title={messages['common.successfully-added-to-reservations']}
        />
      ) : (
        <div>
          <Form
            layout='vertical'
            className='book-waiting-list-form'
            name='basic'
            onFinish={onFinish}>
            <div className='form-field-phone'>
              <Form.Item
                name='phone'
                label={messages['common.phone']}
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
            <Form.Item
              name='first_name'
              label={messages['common.firstName']}
              className='form-field'
              rules={[
                {required: true, message: messages['validation.nameRequired']},
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='last_name'
              label={messages['common.lastName']}
              className='form-field'
              rules={[
                {required: true, message: messages['validation.nameRequired']},
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='guests'
              label={messages['common.guestsNumber']}
              className='form-field'
              rules={[
                {
                  required: true,
                  message: messages['validation.guestsRequired'],
                },
              ]}>
              <InputNumber style={{width: '100%'}} />
            </Form.Item>
            <Form.Item
              name='date'
              label={messages['common.date']}
              className='form-field'
              rules={[
                {required: true, message: messages['validation.dateRequired']},
              ]}>
              <DatePicker style={{width: '100%'}} />
            </Form.Item>
            <Form.Item
              name='time'
              label={messages['common.time']}
              className='form-field'
              rules={[
                {required: true, message: messages['validation.timeRequired']},
              ]}>
              <TimePicker use12Hours format='h:mm a' style={{width: '100%'}} />
            </Form.Item>

            <div className='form-btn-field'>
              <Button
                loading={isLoadingBookReservation}
                type='primary'
                htmlType='submit'
                className='sign-btn'
                block>
                <IntlMessages id='common.save' />
              </Button>
            </div>
          </Form>
        </div>
      )}
    </PublicWrapper>
  );
};

export default Signin;
