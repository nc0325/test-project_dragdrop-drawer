import React, {useEffect} from 'react';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import {List, Row, Col, Spin, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
// import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppCard from '../../../@crema/core/AppCard';
import {
  getNotifications,
  reset,
} from '../../../features/notifications/notificationsSlice';
import './index.style.less';

const Notifications = () => {
  const dispatch = useDispatch();
  const locale = localStorage.getItem('locale');
  const navigate = useNavigate();
  const {page, notifications, isLoading, hasMore} = useSelector(
    (state) => state.notifications,
  );

  const handleLoadMore = () => {
    dispatch(getNotifications(page));
  };

  useEffect(() => {
    dispatch(getNotifications());

    return () => dispatch(reset());
  }, []);

  return (
    <AppCard className='notifications-listItem notifications-card'>
      {notifications.length > 0 && (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              onClick={() => item.data.base_url && navigate(item.data.base_url)}
              className={`notifications-listItem ${
                item.read_at ? '' : 'unread-notifications'
              }`}>
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
          )}
        />
      )}
      {isLoading && (
        <Spin className='notifications-spinner' spinning={true}></Spin>
      )}
      {!isLoading && hasMore && (
        <Button
          onClick={handleLoadMore}
          className='notifications-load-more-button'>
          عرض المزيد
        </Button>
      )}
    </AppCard>
  );
};

export default Notifications;
