import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppCard from '../../../@crema/core/AppCard';
import {
  Col,
  InputNumber,
  Button,
  Spin,
  Input,
  Form,
  Radio,
  Checkbox,
} from 'antd';
import {PercentageOutlined} from '@ant-design/icons';
import '../index.style.less';
import './index.style.less';
import {createGiftCard} from '../../../features/gift-card/giftCardSlice';

const GiftCard = ({title, icon}) => {
  const {messages} = useIntl();
  const formRef = useRef();
  const dispatch = useDispatch();
  const [offerType, setOfferType] = useState('percentage');

  const {isLoading, isSuccess} = useSelector((state) => state.giftCard);

  const handleOfferTypeChange = (e) => {
    setOfferType(e.target.value);
  };

  const handleGiftCardFormFinish = (values) => {
    const data = {
      ...values,
      phone: `5${values.phone}`,
      from: values.from && `5${values.from}`,
    };

    dispatch(createGiftCard(data));
  };

  useEffect(() => {
    if (isSuccess) {
      formRef?.current?.resetFields();
    }
  }, [isSuccess, formRef]);

  return (
    <Spin spinning={isLoading}>
      <AppCard
        title={
          <h3 className='social-card-social-header-title'>
            <img
              src={`/assets/icons/${icon}`}
              className='social-card-loyalty-icon'
            />
            <IntlMessages id={title} />
          </h3>
        }>
        <Form
          initialValues={{
            type: 'percentage',
            gift_type: 'gift',
            english: false,
          }}
          ref={formRef}
          onFinish={handleGiftCardFormFinish}>
          <AppRowContainer justify='center'>
            <Col xs={24}>
              <AppRowContainer justify='center'>
                <Col xs={12} className='social-card-col'>
                  <h4 className='social-card-sub-title'>
                    <IntlMessages id='common.from' />
                  </h4>
                  <Form.Item
                    style={{width: '100%'}}
                    name='from'
                    rules={[
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
                </Col>
                <Col xs={12} className='social-card-col'>
                  <h4 className='social-card-sub-title'>
                    <IntlMessages id='common.to' />
                  </h4>
                  <Form.Item
                    style={{width: '100%'}}
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
                </Col>
              </AppRowContainer>
            </Col>
            <Col xs={24} style={{width: '100%'}}>
              <AppRowContainer justify='center'>
                <Col xs={24} sm={12} className='social-card-col'>
                  <h4 className='social-card-sub-title'>
                    <IntlMessages id='dashboard.gift-amount' />
                  </h4>
                  <Form.Item
                    style={{width: '100%', marginBottom: 0}}
                    name='offer_amount'
                    rules={[
                      {
                        required: true,
                        message: messages['validation.offerAmountRequired'],
                      },
                    ]}>
                    <InputNumber
                      style={{width: '100%'}}
                      className='social-card-input-number'
                      min={0}
                      max={offerType === 'percentage' ? 100 : ''}
                      addonAfter={
                        offerType === 'percentage' && <PercentageOutlined />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    style={{width: '100%', marginBottom: 0}}
                    name='type'
                    rules={[
                      {
                        required: true,
                        message: messages['validation.typeRequired'],
                      },
                    ]}>
                    <Radio.Group
                      style={{width: '100%', marginTop: '20px'}}
                      onChange={handleOfferTypeChange}
                      value={offerType}>
                      <AppRowContainer justify='space-around'>
                        <Radio value='percentage'>
                          {messages['dashboard.social.percentage']}
                        </Radio>
                        <Radio value='fixed'>
                          {messages['dashboard.social.fixed']}
                        </Radio>
                      </AppRowContainer>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} className='social-card-col'>
                  <h4 className='social-card-sub-title'>
                    <IntlMessages id='dashboard.gift-provider-name' />
                  </h4>
                  <Form.Item
                    name='provider_name'
                    style={{width: '100%', marginBottom: 0}}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{width: '100%', marginBottom: 0}}
                    name='gift_type'
                    rules={[
                      {
                        required: true,
                        message: messages['validation.giftTypeRequired'],
                      },
                    ]}>
                    <Radio.Group style={{width: '100%', marginTop: '20px'}}>
                      <AppRowContainer justify='space-around'>
                        <Radio value='gift'>{messages['common.gift']}</Radio>
                        <Radio value='compensation'>
                          {messages['common.compensation']}
                        </Radio>
                      </AppRowContainer>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </AppRowContainer>
            </Col>

            <AppRowContainer justify='center'>
              <Col xs={12} className='social-card-col'>
                <Button type='primary' htmlType='submit'>
                  {messages['common.send']}
                </Button>
              </Col>
              <Col xs={12} className='social-card-col'>
                <Form.Item name='english' valuePropName='checked'>
                  <Checkbox style={{marginTop: '24px'}}>English</Checkbox>
                </Form.Item>
              </Col>
            </AppRowContainer>
          </AppRowContainer>
        </Form>
      </AppCard>
    </Spin>
  );
};

export default GiftCard;

GiftCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
};
