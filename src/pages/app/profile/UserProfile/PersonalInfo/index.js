import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import {Avatar, Form, Col, Input, Button, Spin} from 'antd';
import {AppRowContainer} from '../../../../../@crema';
import {useDropzone} from 'react-dropzone';
import './index.style.less';
import {
  updateUserInfo,
  updateUserAvatar,
} from '../../../../../features/userInfo/userInfoSlice';

const PersonalInfo = () => {
  const {messages} = useIntl();
  const formRef = useRef();
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState('/assets/images/placeholder.jpg');

  const {user, isLoading} = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (user) {
      formRef.current.setFieldsValue({
        name: user.name,
        email: user.email,
      });

      setUserImage(user.avatar);
    }
  }, [user]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));

      let formData = new FormData();
      formData.append('avatar', acceptedFiles[0]);

      dispatch(updateUserAvatar(formData));
    },
  });

  const onFinish = (values) => {
    dispatch(updateUserInfo(values));
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        layout='vertical'
        ref={formRef}
        onFinish={onFinish}
        initialValues={{
          userImage: user?.avatar
            ? user.avatar
            : '/assets/images/placeholder.jpg',
        }}>
        <Form.Item className='info-upload'>
          <Avatar className='info-upload-avatar' src={userImage} />

          <div className='info-upload-content'>
            <div className='info-upload-btn-group'>
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <label htmlFor='icon-button-file'>
                  <Button type='primary'>{messages['common.upload']}</Button>
                </label>
              </div>
            </div>
            <p>{messages['common.allowed-images']}</p>
          </div>
        </Form.Item>
        <AppRowContainer gutter={16}>
          <Col xs={24}>
            <Form.Item
              label={messages['common.name']}
              name='name'
              initialValue={user ? user.name : ''}
              rules={[
                {required: true, message: messages['validation.nameRequired']},
              ]}>
              <Input type='text' placeholder={messages['common.name']} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={messages['common.email']}
              name='email'
              rules={[
                {required: true, message: messages['validation.emailRequired']},
              ]}>
              <Input type='email' placeholder={messages['common.email']} />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item shouldUpdate className='user-profile-group-btn'>
              <Button type='primary' htmlType='submit'>
                {messages['common.save']}
              </Button>
            </Form.Item>
          </Col>
        </AppRowContainer>
      </Form>
    </Spin>
  );
};

export default PersonalInfo;
