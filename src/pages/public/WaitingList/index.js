import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Button, Result} from 'antd';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import PublicWrapper from '../PublicWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import './index.style.less';
import {getPublicAccountData} from '../../../features/account/accountSlice';
import {bookWaitingList} from '../../../features/bookWaitingList/bookWaitingListSlice';

const Signin = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {messages} = useIntl();

  const {isLoading, isError, account} = useSelector((state) => state.account);

  const {isSuccess, isLoadingBookWaitingList} = useSelector(
    (state) => state.bookWaitingList,
  );

  const onFinish = (values) => {
    dispatch(bookWaitingList({id, data: {phone: '5' + values.phone}}));
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
      title={`${messages['common.waiting-list']}${
        account ? ` | ${account.name}` : ''
      }`}>
      <AppPageMetadata title='Waiting List' />
      {isSuccess ? (
        <Result
          status='success'
          title={messages['common.successfully-added-to-wating-list']}
        />
      ) : (
        <div>
          <Form
            className='book-waiting-list-form'
            name='basic'
            onFinish={onFinish}>
            <div className='form-field-phone'>
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
                  className='phone-input'
                  placeholder={messages['common.phone']}
                />
              </Form.Item>
            </div>

            <div className='form-btn-field'>
              <Button
                loading={isLoadingBookWaitingList}
                type='primary'
                htmlType='submit'
                className='sign-btn'
                block>
                <IntlMessages id='common.add' />
              </Button>
            </div>
          </Form>
        </div>
      )}
    </PublicWrapper>
  );
};

export default Signin;
