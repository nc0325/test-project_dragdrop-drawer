import React, {useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {Result, Spin} from 'antd';
import {successFoodics} from '../../../../../features/integrations/integrationsSlice';

const Success = () => {
  const {messages} = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();
  const {isSuccess, isLoading, isError} = useSelector(
    (state) => state.integrations,
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    dispatch(successFoodics({code: params.get('code')}));
  }, []);

  return (
    <>
      {isLoading && (
        <Result
          icon={<Spin spinning={true} />}
          status='success'
          title={messages['common.foodics.intrgrations-loading']}
        />
      )}
      {isSuccess && (
        <Result
          status='success'
          title={messages['common.foodics.intrgrations-done']}
          extra={[
            <Link to='/integrations' key='imtegrations'>
              {messages['common.profile']}
            </Link>,
          ]}
        />
      )}
      {isError && (
        <Result
          status='error'
          title={messages['common.somthing-went-wrong']}
          extra={[
            <Link to='/integrations' key='imtegrations'>
              {messages['common.profile']}
            </Link>,
          ]}
        />
      )}
    </>
  );
};

export default Success;
