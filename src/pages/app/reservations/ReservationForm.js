import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Spin,
  DatePicker,
  TimePicker,
} from 'antd';
import {useIntl} from 'react-intl';
import {createReservation} from '../../../features/reservations/reservationsSlice';
import './index.style.less';

const ReservationForm = ({formRef}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const {isLoading, isSuccess} = useSelector((state) => state.reservations);

  const onFinish = (values) => {
    dispatch(
      createReservation({
        ...values,
        phone: '5' + values.phone,
        date: values.date.locale('en').format('YYYY-MM-DD'),
        time: values.time.locale('en').format('HH:mm'),
      }),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      formRef?.current?.resetFields();
    }
  }, [isSuccess]);

  return (
    <Spin spinning={isLoading}>
      <Form
        ref={formRef}
        layout='vertical'
        className='edit-customer-form'
        name='basic'
        initialValues={{remember: true}}
        onFinish={onFinish}>
        <Form.Item
          label={messages['common.phone']}
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
          />
        </Form.Item>
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
            {required: true, message: messages['validation.guestsRequired']},
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

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {messages['common.save']}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ReservationForm;

ReservationForm.propTypes = {
  formRef: PropTypes.any,
};
