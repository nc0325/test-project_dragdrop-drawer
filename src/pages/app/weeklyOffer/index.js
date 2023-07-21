import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';
import {Form, Input, Switch, Button, Spin, Col} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {FaEye, FaUserCheck} from 'react-icons/fa';
import {blue, green} from '@ant-design/colors';
import {useDispatch, useSelector} from 'react-redux';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppCard from '../../../@crema/core/AppCard';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import StatsCard from '../../../components/shared/StatsCard';
import {
  getWeeklyOffer,
  createWeeklyOffer,
  updateWeeklyOffer,
} from '../../../features/weeekly-offer/weeklyOfferSlice';
import './index.style.less';

const WeeklyOffer = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const formRef = useRef();

  const {weeklyOffer, isLoading} = useSelector((state) => state.weeklyOffer);

  const handleFormFinish = (values) => {
    if (weeklyOffer) {
      dispatch(updateWeeklyOffer(values));
    } else {
      dispatch(createWeeklyOffer(values));
    }
  };

  useEffect(() => {
    dispatch(getWeeklyOffer());
  }, []);

  if (weeklyOffer) {
    formRef.current?.setFieldsValue({
      title: weeklyOffer.title,
      body: weeklyOffer.body,
      footer: weeklyOffer.footer,
      is_live: weeklyOffer.is_live,
    });
  }

  return (
    <Spin spinning={isLoading}>
      {weeklyOffer && (
        <AppRowContainer>
          <Col xs={24} sm={12}>
            <StatsCard
              text={<IntlMessages id='dashboard.customerEngagement' />}
              value={weeklyOffer.total_engagement}
              bgColor={blue[3]}
              icon={<FaEye size={24} />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <StatsCard
              text={<IntlMessages id='dashboard.customerServiceUsed' />}
              value={weeklyOffer.total_used}
              bgColor={green[5]}
              icon={<FaUserCheck size={24} />}
            />
          </Col>
        </AppRowContainer>
      )}
      <AppCard
        title={messages['common.our-new']}
        className='notifications-listItem notifications-card'>
        <Form ref={formRef} layout='vertical' onFinish={handleFormFinish}>
          <Form.Item
            label={messages['common.title']}
            name='title'
            rules={[
              {required: true, message: messages['validation.titleRequired']},
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={messages['common.description']}
            name='body'
            rules={[
              {
                required: true,
                message: messages['validation.descriptionRequired'],
              },
            ]}>
            <Input.TextArea rows={7} />
          </Form.Item>
          <Form.Item label={messages['common.footer']} name='footer'>
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={false}
            valuePropName='checked'
            label={messages['common.activate']}
            name='is_live'>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              // onChange={handelIsLiveUpdate}
              // checked={isLive}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {messages['common.save']}
            </Button>
          </Form.Item>
        </Form>
      </AppCard>
    </Spin>
  );
};

export default WeeklyOffer;
