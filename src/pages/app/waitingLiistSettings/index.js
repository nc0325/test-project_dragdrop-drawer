import React from 'react';
import {useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import {Button, Col, Descriptions, Space} from 'antd';
import {SelectOutlined, CopyOutlined} from '@ant-design/icons';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppCard from '../../../@crema/core/AppCard';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

const QuickService = () => {
  const {messages} = useIntl();
  const [, copy] = useCopyToClipboard();

  const {isLoading, account} = useSelector((state) => state.userInfo);

  return (
    <AppRowContainer>
      <Col xs={24}>
        <AppCard
          heightFull
          className='sub-card'
          title={messages['common.waiting-list']}>
          <Descriptions layout='horizontal'>
            <Descriptions.Item
              span={3}
              label={messages['common.waiting-list-customer-url']}>
              <Space wrap size='small'>
                <Button
                  loading={isLoading}
                  icon={<SelectOutlined />}
                  size='small'
                  type='primary'
                  href={`https://${account?.waiting_list_url}`}
                  target='_blank'
                  rel='noreferrer'>
                  {messages['common.visit']}
                </Button>
                <Button
                  loading={isLoading}
                  icon={<CopyOutlined />}
                  onClick={() =>
                    copy(
                      account?.waiting_list_url,
                      messages['common.copied-to-clipboard'],
                    )
                  }
                  size='small'>
                  {messages['common.copy']}
                </Button>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </AppCard>
      </Col>
    </AppRowContainer>
  );
};

export default QuickService;
