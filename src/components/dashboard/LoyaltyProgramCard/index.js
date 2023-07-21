import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppCard from '../../../@crema/core/AppCard';
import {Col, Switch, Radio, InputNumber, Button, Spin} from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import '../index.style.less';
import './index.style.less';
import {updateLoyalty} from '../../../features/home/homeSlice';

const LoyaltyProgramCard = ({
  id,
  icon,
  title,
  isLive,
  type,
  loyaltyOfferAmount,
}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [offerType, setOfferType] = useState(type);
  const [offerAmount, setOfferAmount] = useState(loyaltyOfferAmount);

  const {isLoyaltyLoading} = useSelector((state) => state.home);

  const handelIsLiveUpdate = () => {
    const data = {is_live: !isLive};

    dispatch(updateLoyalty({id, data}));
  };

  const handleLoyaltyUpdate = () => {
    const data = {
      type: offerType,
      offer_amount: offerAmount,
    };

    dispatch(updateLoyalty({id, data}));
  };

  const handleOfferTypeChange = (e) => {
    setOfferType(e.target.value);
  };

  const handleOfferAmountChange = (value) => {
    setOfferAmount(value);
  };

  return (
    <Spin spinning={isLoyaltyLoading}>
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
        <AppRowContainer justify='center' align='middle'>
          <Col xs={12} sm={3} className='social-card-col'>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={handelIsLiveUpdate}
              checked={isLive}
            />
          </Col>
          <Col xs={12} sm={3} className='social-card-col'>
            <h4 className='social-card-sub-title'>
              <IntlMessages
                id={
                  isLive ? 'dashboard.social.live' : 'dashboard.social.offline'
                }
              />
            </h4>
          </Col>

          <Col xs={24} sm={12} className='social-card-col'>
            <h4 className='social-card-sub-title'>
              <IntlMessages id='dashboard.social.offerTitle' />
            </h4>
            <Col xs={24} style={{width: '100%'}}>
              <Col xs={24} style={{width: '100%'}}>
                <InputNumber
                  className='social-card-input-number'
                  min={0}
                  max={offerType === 'percentage' ? 100 : ''}
                  onChange={handleOfferAmountChange}
                  value={offerAmount}
                  addonAfter={
                    offerType === 'percentage' && <PercentageOutlined />
                  }
                />
              </Col>
              <Col xs={24} style={{width: '100%'}}>
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
              </Col>
            </Col>
          </Col>

          <Col xs={24} sm={6} className='social-card-col'>
            <h4 className='social-card-sub-title'></h4>
            <Button onClick={handleLoyaltyUpdate} type='primary'>
              {messages['common.save']}
            </Button>
          </Col>
        </AppRowContainer>
      </AppCard>
    </Spin>
  );
};

export default LoyaltyProgramCard;

LoyaltyProgramCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  isLive: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  loyaltyOfferAmount: PropTypes.number,
};
