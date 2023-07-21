import React from 'react';
import AppCard from '../../../@crema/core/AppCard';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {Col, Skeleton} from 'antd';

const QuickServiceSkeleton = () => {
  return (
    <AppRowContainer>
      <Col xs={24} md={12}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24} md={12}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24} md={12}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24} md={12}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24} md={12}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24} md={12}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
    </AppRowContainer>
  );
};

export default QuickServiceSkeleton;
