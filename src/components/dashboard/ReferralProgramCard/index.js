import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppCard from '../../../@crema/core/AppCard';
import {Col, Switch, Select, InputNumber, Button, Spin, message} from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import '../index.style.less';
import './index.style.less';
import {updateReferral} from '../../../features/home/homeSlice';
import {useHasPermissions} from '../../../hooks/useHasPermissions';
import {getProducts} from '../../../features/searchProductsForSelect/searchProductsForSelectSlice';

const ReferralProgramCard = ({
  id,
  icon,
  title,
  totalEngagement,
  totalUsed,
  isLive,
  type,
  referralOfferAmount,
  referralProducts,
  referralActiveAfter,
}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();
  const [offerType, setOfferType] = useState(type);
  const [activeAfter, setActiveAfter] = useState(referralActiveAfter);
  const [offerAmount, setOfferAmount] = useState(referralOfferAmount);
  const [products, setProducts] = useState(
    referralProducts?.length > 0
      ? referralProducts.map((product) => ({
          label: product.name,
          value: product.id,
        }))
      : [],
  );

  const delayedDispatchGetProducts = useCallback(
    debounce((q) => {
      if (q.length > 0) {
        dispatch(getProducts(q));
      }
    }, 500),
    [],
  );

  const {isReferralLoading} = useSelector((state) => state.home);

  const {isLoading: isProductsLoading, products: searchedProducts} =
    useSelector((state) => state.searchProductsForSelect);

  const handelIsLiveUpdate = () => {
    const data = {is_live: !isLive};

    dispatch(updateReferral({id, data}));
  };

  const handleReferralUpdate = () => {
    if (
      offerType === 'percentage' &&
      offerAmount == 100 &&
      products.length === 0
    ) {
      message.error(messages['validation.required-with-full-percentage']);
      return;
    }

    const data = {
      type: offerType,
      offer_amount: offerAmount,
      active_after: activeAfter,
    };

    if (products.length > 0) {
      data.products = products.map((p) => p.value);
    } else {
      data.products = [];
    }

    dispatch(updateReferral({id, data}));
  };

  const handleOfferTypeChange = (e) => {
    setOfferType(e.value);
  };

  const handleOfferAmountChange = (value) => {
    setOfferAmount(value);
  };

  const handleProductsSearch = (value) => {
    delayedDispatchGetProducts(value);
  };

  const handleActiveAfterChange = (value) => {
    setActiveAfter(value);
  };

  const handleProductsChnage = (data) => {
    setProducts(data);
  };

  return (
    <Spin spinning={isReferralLoading}>
      <AppCard
        title={
          <h3 className='social-card-social-header-title'>
            <img
              src={`/assets/icons/${icon}`}
              className='social-card-referral-icon'
            />
            <IntlMessages id={title} />
          </h3>
        }>
        <AppRowContainer justify='center'>
          {can('update referral') && (
            <>
              <Col xs={24} sm={12} md={3} className='social-card-col'>
                <h4 className='social-card-sub-title'>
                  <IntlMessages
                    id={
                      isLive
                        ? 'dashboard.social.live'
                        : 'dashboard.social.offline'
                    }
                  />
                </h4>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={handelIsLiveUpdate}
                  checked={isLive}
                />
              </Col>
              <Col xs={24} sm={12} md={3} className='social-card-col'>
                <h4 className='social-card-sub-title'>
                  <IntlMessages id='dashboard.social.type' />
                </h4>
                <Select
                  labelInValue
                  onChange={handleOfferTypeChange}
                  value={{key: offerType}}>
                  <Select.Option value='percentage'>
                    {messages['dashboard.social.percentage']}
                  </Select.Option>
                  <Select.Option value='fixed'>
                    {messages['dashboard.social.fixed']}
                  </Select.Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={3} className='social-card-col'>
                <h4 className='social-card-sub-title'>
                  <IntlMessages id='dashboard.social.offerTitle' />
                </h4>
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
              <Col xs={24} sm={12} md={6} className='social-card-col'>
                <h4 className='social-card-sub-title'>
                  <IntlMessages id='common.products' />
                </h4>

                <div>
                  <p
                    style={{
                      fontSize: '10px',
                      color: '#000000',
                    }}>
                    {messages['common.leave-empty-to-apply-for-all-products']}
                  </p>
                  <Select
                    mode='multiple'
                    allowClear
                    showSearch
                    labelInValue
                    filterOption={false}
                    onSearch={handleProductsSearch}
                    onChange={handleProductsChnage}
                    notFoundContent={
                      isProductsLoading ? <Spin size='small' /> : null
                    }
                    placeholder={messages['common.search']}
                    style={{
                      width: '100%',
                    }}
                    value={products}
                    options={searchedProducts}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={3} className='social-card-col'>
                <h4 className='social-card-sub-title'>
                  <IntlMessages id='dashboard.social.active-after' />
                </h4>
                <InputNumber
                  onChange={handleActiveAfterChange}
                  value={activeAfter}
                />
              </Col>

              <Col xs={24} sm={12} md={2} className='social-card-col'>
                <h4 className='social-card-sub-title'></h4>
                <Button onClick={handleReferralUpdate} type='primary'>
                  {messages['common.save']}
                </Button>
              </Col>
            </>
          )}

          <Col xs={24} sm={12} md={2} className='social-card-col'>
            <h4 className='social-card-sub-title'>
              <IntlMessages id='dashboard.social.engagement' />
            </h4>
            <h3>{totalEngagement}</h3>
          </Col>
          <Col xs={24} sm={12} md={2} className='social-card-col'>
            <h4 className='social-card-sub-title'>
              <IntlMessages id='dashboard.social.used' />
            </h4>
            <h3>{totalUsed}</h3>
          </Col>
        </AppRowContainer>
      </AppCard>
    </Spin>
  );
};

export default ReferralProgramCard;

ReferralProgramCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  totalEngagement: PropTypes.number,
  totalUsed: PropTypes.number,
  isLive: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  referralOfferAmount: PropTypes.number,
  referralProducts: PropTypes.array,
  referralActiveAfter: PropTypes.number,
};
