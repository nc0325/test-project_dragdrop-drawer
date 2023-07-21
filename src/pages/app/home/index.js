import React from 'react';
import {useIntl} from 'react-intl';
import {Col} from 'antd';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppHomeCard from '../../../components/home/AppHomeCard';
import DashboardIcon from '../../../components/home/icons/DashboardIcon';
import TableSystemIcon from '../../../components/home/icons/TableSystemIcon';
import ReservationIcon from '../../../components/home/icons/ReservationIcon';
import TaskAutomationIcon from '../../../components/home/icons/TaskAutomationIcon';
import MarketingAutomationIcon from '../../../components/home/icons/MarketingAutomationIcon';
import MessagingIcon from '../../../components/home/icons/MessagingIcon';
import IntergrationIcon from '../../../components/home/icons/IntergrationIcon';
import ReportsIcon from '../../../components/home/icons/ReportsIcon';
import GuestContactsIcon from '../../../components/home/icons/GuestContactsIcon';
import GuestSatisfactionIcon from '../../../components/home/icons/GuestSatisfactionIcon';

const Home = () => {
  const {messages} = useIntl();

  return (
    <AppRowContainer>
      <Col xs={24}>
        <AppRowContainer justify='center' style={{gap: '20px'}}>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              path='/dashboard'
              title={messages['common.dashboard']}
              icon={DashboardIcon}
              color='#ff9559'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              path='/table-system'
              title={messages['common.table-system']}
              icon={TableSystemIcon}
              color='#2196F3'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              path='/reservations'
              title={messages['common.reservation']}
              icon={ReservationIcon}
              color='#FF7294'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              title={messages['common.task-automation']}
              icon={TaskAutomationIcon}
              color='#E7BA34'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              title={messages['common.marketing-automation']}
              icon={MarketingAutomationIcon}
              color='#FF6859'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              isBlocked={true}
              title={messages['common.messaging']}
              icon={MessagingIcon}
              color='#4CAF50'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              path='/integrations'
              title={messages['common.intergration']}
              icon={IntergrationIcon}
              color='#FF6859'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              title={messages['common.reports']}
              icon={ReportsIcon}
              color='#1EB980'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              path='/customers'
              title={messages['common.guest-contacts']}
              icon={GuestContactsIcon}
              color='#795548'
            />
          </Col>
          <Col xs={10} md={6} lg={5} xl={4} style={{margin: 0}}>
            <AppHomeCard
              path='/feedbacks'
              title={messages['common.guest-satisfaction']}
              icon={GuestSatisfactionIcon}
              color='#B15DFF'
            />
          </Col>
        </AppRowContainer>
      </Col>
    </AppRowContainer>
  );
};

export default Home;
