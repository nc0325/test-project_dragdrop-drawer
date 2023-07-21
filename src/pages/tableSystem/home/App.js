import {ColorModeContext, useMode} from './theme';
import {useState} from 'react';
import {CssBaseline, ThemeProvider, Tabs, Tab, Box} from '@mui/material';
import Topbar from './scenes/global/Topbar';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Spin} from 'antd';
import './App.css';

import Design from './scenes/design';
import List from './scenes/list';
import Grid from './scenes/grid';
import Timeline from './scenes/timeline';
import Reservations from './scenes/reservations';
import Waitlist from './scenes/waitlist';
import Guests from './scenes/guests';
import Servers from './scenes/servers';

import imgUnion from 'assets/images/union.png';

function App() {
  const [theme, colorMode] = useMode();
  const [currentTab, setCurrentTab] = useState(0);
  const {isLoading} = useSelector((state) => state.userInfo);
  // const location = useLocation();
  const navigate = useNavigate();
  // Somewhere in your code, e.g. inside a handler:
  const handleTabClick = (e, val) => {
    setCurrentTab(val);
    switch (val) {
      case 0:
        return navigate('/table-system');
      case 1:
        return navigate('/table-system/list');
      case 2:
        return navigate('/table-system/grid');
      case 3:
        return navigate('/table-system/timeline');
      case 4:
        return navigate('/table-system/reservations');
      case 5:
        return navigate('/table-system/waitlist');
      case 6:
        return navigate('/table-system/guests');
      case 7:
        return navigate('/table-system/servers');
      default:
        return navigate('/table-system');
    }
  };
  // const handleActiveTab = () => {
  //   switch (location.pathname) {
  //     case '/table-system':
  //       return '0';
  //     case '/table-system/list':
  //       return '1';
  //     case '/table-system/grid':
  //       return '2';
  //     case '/table-system/timeline':
  //       return '3';
  //     case '/table-system/reservations':
  //       return '4';
  //     case '/table-system/waitlist':
  //       return '5';
  //     case '/table-system/guests':
  //       return '6';
  //     case '/table-system/servers':
  //       return '7';
  //     // default:
  //     //   return '1';
  //   }
  // };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <main className='content'>
            <Topbar />
            <Spin spinning={isLoading}>
              {!isLoading && (
                <div className='home-container'>
                  <div className='home-menu-bar'>
                    <div className='home-btn-newReservation'>
                      NEW RESERVATIONS
                    </div>
                    <Tabs
                      value={currentTab}
                      onChange={handleTabClick}
                      indicatorColor='secondary'
                      textColor='inherit'
                      variant='fullWidth'
                      aria-label='full width tabs example'
                      className='home-tab-group'
                      orientation='vertical'>
                      <Tab label='FLOOR' />
                      <Tab label='LIST' />
                      <Tab label='GRID' />
                      <Tab label='TIMELINE' />
                      <Tab label='RESERVATIONS' />
                      <Tab label='WAITLIST' />
                      <Tab label='GUESTS' />
                      <Tab label='SERVERS' />
                    </Tabs>
                    <div className='home-btn-live'>LIVE</div>
                    <div className='home-logo'>
                      <img src={imgUnion} alt='union' />
                    </div>
                  </div>
                  <Box className='home-body' style={{marginLeft: '240px'}}>
                    <div className='home-closebtn'>
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M0.709956 0.700029C0.522704 0.886861 0.417471 1.14051 0.417471 1.40503C0.417471 1.66955 0.522704 1.9232 0.709956 2.11003L5.58996 7.00003L0.699956 11.89C0.512704 12.0769 0.407471 12.3305 0.407471 12.595C0.407471 12.8595 0.512704 13.1132 0.699956 13.3C1.08996 13.69 1.71996 13.69 2.10996 13.3L6.99996 8.41003L11.89 13.3C12.28 13.69 12.91 13.69 13.3 13.3C13.69 12.91 13.69 12.28 13.3 11.89L8.40996 7.00003L13.3 2.11003C13.69 1.72003 13.69 1.09003 13.3 0.700029C12.91 0.310029 12.28 0.310029 11.89 0.700029L6.99996 5.59003L2.10996 0.700029C1.72996 0.320029 1.08996 0.320029 0.709956 0.700029Z'
                          fill='#EDEDED'
                        />
                      </svg>
                    </div>
                    {currentTab == 0 && <Design />}
                    {currentTab == 1 && <List />}
                    {currentTab == 2 && <Grid />}
                    {currentTab == 3 && <Timeline />}
                    {currentTab == 4 && <Reservations />}
                    {currentTab == 5 && <Waitlist />}
                    {currentTab == 6 && <Guests />}
                    {currentTab == 7 && <Servers />}
                  </Box>
                </div>
              )}
            </Spin>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
