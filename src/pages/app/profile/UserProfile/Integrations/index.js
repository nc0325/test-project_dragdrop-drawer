import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Form, Spin, Alert} from 'antd';
import AppRowContainer from '../../../../../@crema/core/AppRowContainer';
import AppCard from '../../../../../@crema/core/AppCard';
// import PropTypes from 'prop-types';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import {
  initiateFoodics,
  getIntegrations,
} from '../../../../../features/integrations/integrationsSlice';
import './index.style.less';

const Integrations = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const {isLoadingInitiateFoodics, foodicsUrl, integrations, isLoading} =
    useSelector((state) => state.integrations);

  const handleFoodicsFinish = () => {
    dispatch(initiateFoodics());
  };

  useEffect(() => {
    dispatch(getIntegrations());
  }, []);

  useEffect(() => {
    if (foodicsUrl) {
      window.location.href = foodicsUrl;
    }
  }, [foodicsUrl]);

  return (
    <Spin spinning={isLoading}>
      <div className='profile-connection'>
        <h3 className='profile-connection-title'>
          <IntlMessages id='common.integrations' />
        </h3>
        <AppRowContainer gutter={16}>
          <Col xs={24}>
            <div className='member-item'>
              <AppCard heightFull className='member-card'>
                <h4 className='member-card-title'>
                  <IntlMessages id='common.foodics' />
                </h4>
                <div className='member-info'>
                  <div className='member-info-content'>
                    {integrations &&
                    integrations?.find(
                      (integration) => integration.provider_name === 'Foodics',
                    ) ? (
                      <Alert
                        message={
                          messages['common.foodics.foodics-connected-message']
                        }
                        type='success'
                        showIcon
                      />
                    ) : (
                      <Form onFinish={handleFoodicsFinish}>
                        <AppRowContainer justify='space-between' align='middle'>
                          <Col xs={12} md={6}>
                            <Form.Item>
                              <Button
                                htmlType='submit'
                                className='foodics-btn'
                                loading={isLoadingInitiateFoodics}>
                                <IntlMessages id='common.foodics.connect' />
                              </Button>
                            </Form.Item>
                          </Col>
                        </AppRowContainer>
                      </Form>
                    )}
                  </div>
                </div>
              </AppCard>
            </div>
          </Col>
        </AppRowContainer>
      </div>
    </Spin>
  );
};

export default Integrations;

Integrations.propTypes = {};
