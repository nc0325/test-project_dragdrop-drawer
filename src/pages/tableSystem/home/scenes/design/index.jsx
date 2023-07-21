import {Box, useTheme, Button, Tabs, Tab} from '@mui/material';
import {useState} from 'react';
import {tokens} from '../../theme';
import ItemGallery from './gallery';
import DesignBoard from './board';
import './style.css';
const Design = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Box className='design-container'>
      <Box
        className='nav-bottom-bar'
        sx={{
          marginTop: '20px',
        }}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
          indicatorColor='secondary'
          textColor='inherit'
          variant='fullWidth'
          aria-label='full width tabs example'
          className='design-tab'>
          <Tab label='Main' />
          <Tab label='Second Floor' />
          <Tab label='Outside' />
          <Tab label='Balcony' />
          <Tab label='New Room' />
        </Tabs>
        <Button
          variant='contained'
          sx={{
            backgroundColor: colors.purple[200],
            borderRadius: '8px',
            width: '43px',
            height: '43px',
            padding: '10px',
            minWidth: 'unset',
          }}>
          <svg
            width='18'
            height='17'
            viewBox='0 0 18 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.46 16.716V0.0839989H11.104V16.716H6.46ZM0.232 10.596V6.204H17.368V10.596H0.232Z'
              fill='white'
            />
          </svg>
        </Button>
      </Box>
      <Box className='design-body'>
        {currentTab == 0 && <></>}
        {currentTab == 1 && <></>}
        {currentTab == 2 && <></>}
        {currentTab == 3 && <></>}
        {currentTab == 4 && (
          <Box className='design-newroom'>
            <DesignBoard />
            <ItemGallery></ItemGallery>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Design;
