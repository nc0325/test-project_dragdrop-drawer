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
import {updateOfferProvider} from '../../../features/home/homeSlice';
import {useHasPermissions} from '../../../hooks/useHasPermissions';
import {getProducts} from '../../../features/searchProductsForSelect/searchProductsForSelectSlice';

const OfferProviderCard = ({
  id,
  isLoading,
  icon,
  title,
  totalEngagement,
  totalUsed,
  isLive,
  type,
  providerOfferAmount,
  providerProducts,
}) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const can = useHasPermissions();
  const [offerType, setOfferType] = useState(type);
  const [offerAmount, setOfferAmount] = useState(providerOfferAmount);
  const [products, setProducts] = useState(
    providerProducts?.length > 0
      ? providerProducts.map((product) => ({
          label: product.name,
          value: product.id,
        }))
      : [],
  );

  const {isLoading: isProductsLoading, products: searchedProducts} =
    useSelector((state) => state.searchProductsForSelect);

  const delayedDispatchGetProducts = useCallback(
    debounce((q) => {
      if (q.length > 0) {
        dispatch(getProducts(q));
      }
    }, 500),
    [],
  );

  const handelIsLiveUpdate = () => {
    const data = {is_live: !isLive};

    dispatch(updateOfferProvider({id, data}));
  };

  const handleOfferProviderUpdate = () => {
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
    };

    if (products.length > 0) {
      data.products = products.map((p) => p.value);
    } else {
      data.products = [];
    }

    dispatch(updateOfferProvider({id, data}));
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

  const handleProductsChnage = (data) => {
    setProducts(data);
  };

  return (
    <Spin spinning={isLoading}>
      <AppCard
        title={
          <h3 className='social-card-social-header-title'>
            <img
              src={`/assets/icons/${icon}`}
              className='social-card-social-icon'
            />
            <IntlMessages id={title} />
          </h3>
        }>
        <AppRowContainer justify='center'>
          {can('update offerProvider') && (
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
              <Col xs={24} sm={12} md={4} className='social-card-col'>
                <h4 className='social-card-sub-title'>
                  <IntlMessages id='dashboard.social.type' />
                </h4>
                <Select
                  style={{width: '100%'}}
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

                <div style={{width: '100%'}}>
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

              <Col xs={24} sm={12} md={2} className='social-card-col'>
                <h4 className='social-card-sub-title'></h4>
                <Button onClick={handleOfferProviderUpdate} type='primary'>
                  {messages['common.save']}
                </Button>
              </Col>
            </>
          )}

          <Col xs={24} sm={12} md={3} className='social-card-col'>
            <h4 className='social-card-sub-title'>
              <IntlMessages id='dashboard.social.engagement' />
            </h4>
            <h3>{totalEngagement}</h3>
          </Col>
          <Col xs={24} sm={12} md={3} className='social-card-col'>
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

export default OfferProviderCard;

OfferProviderCard.propTypes = {
  icon: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  totalEngagement: PropTypes.number,
  totalUsed: PropTypes.number,
  isLive: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  providerOfferAmount: PropTypes.number,
  providerProducts: PropTypes.array,
};
