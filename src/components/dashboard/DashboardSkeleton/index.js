import React from 'react';
import AppCard from '../../../@crema/core/AppCard';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {Col, Skeleton} from 'antd';

const DashboardSkeleton = () => {
  return (
    <AppRowContainer>
      <Col xs={24}>
        <AppRowContainer>
          <Col xs={{span: 24, order: 1}} md={{span: 12, order: 1}}>
            <AppCard heightFull>
              <Skeleton active />
            </AppCard>
          </Col>
          <Col xs={{span: 24, order: 3}} md={{span: 6, order: 2}}>
            <AppCard heightFull>
              <Skeleton active />
            </AppCard>
          </Col>
          <Col xs={{span: 24, order: 4}} md={{span: 6, order: 3}}>
            <AppCard heightFull>
              <Skeleton active />
            </AppCard>
          </Col>

          <Col xs={{span: 24, order: 2}} md={{span: 6, order: 4}}>
            <AppCard heightFull>
              <Skeleton active />
            </AppCard>
          </Col>
          <Col xs={{span: 24, order: 5}} md={{span: 9, order: 5}}>
            <AppCard heightFull>
              <Skeleton active />
            </AppCard>
          </Col>
          <Col xs={{span: 24, order: 6}} md={{span: 9, order: 6}}>
            <AppCard heightFull>
              <Skeleton active />
            </AppCard>
          </Col>
        </AppRowContainer>
      </Col>

      <Col xs={24}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
      <Col xs={24}>
        <AppCard heightFull>
          <Skeleton active />
        </AppCard>
      </Col>
    </AppRowContainer>
  );
};

export default DashboardSkeleton;
