import React from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ar';
import PropTypes from 'prop-types';
import {List, Row, Col} from 'antd';
import './NotificationItem.less';

const NotificationItem = (props) => {
  const {item} = props;
  const navigate = useNavigate();
  const locale = localStorage.getItem('locale');

  return (
    <List.Item
      onClick={() => item.data.base_url && navigate(item.data.base_url)}
      className='notify-listItem item-hover'>
      <List.Item.Meta
        title={
          <Row justify='space-between'>
            <Col className='title'>{item.data.title[locale]}</Col>
            <Col className='time'>
              {moment(item.created_at).locale(locale).fromNow()}
            </Col>
          </Row>
        }
        description={item.data.subtitle[locale]}
      />
    </List.Item>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
};
