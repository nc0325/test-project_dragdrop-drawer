import React from 'react';
import {Space, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

const Spinner = () => {
  return (
    <Space>
      <Spin indicator={<LoadingOutlined />} />
    </Space>
  );
};

export default Spinner;
