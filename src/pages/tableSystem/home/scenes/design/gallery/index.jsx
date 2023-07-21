import {Box, Typography, Tabs, Tab} from '@mui/material';
import {useState} from 'react';
import './style.css';

// Gallery Items
import imgWall_1_1 from 'assets/images/walls/wall_1_1.png';
import imgWall_1_2 from 'assets/images/walls/wall_1_2.png';
import imgWall_1_3 from 'assets/images/walls/wall_1_3.png';
import imgWall_1_4 from 'assets/images/walls/wall_1_4.png';
import imgWall_1_5 from 'assets/images/walls/wall_1_5.png';
import imgWall_2_1 from 'assets/images/walls/wall_2_1.png';
import imgWall_2_2 from 'assets/images/walls/wall_2_2.png';
import imgWall_2_3 from 'assets/images/walls/wall_2_3.png';

import imgTable_1 from 'assets/images/tables_chairs/table_1.png';
import imgTable_2 from 'assets/images/tables_chairs/table_2.png';

import imgChair_1 from 'assets/images/tables_chairs/chair_1.png';
import imgChair_2 from 'assets/images/tables_chairs/chair_2.png';
import imgChair_3 from 'assets/images/tables_chairs/chair_3.png';
import imgChair_4 from 'assets/images/tables_chairs/chair_4.png';

import imgLabel_1 from 'assets/images/labels/label_1.png';
import imgLabel_2 from 'assets/images/labels/label_2.png';
import imgLabel_3 from 'assets/images/labels/label_3.png';
import imgLabel_4 from 'assets/images/labels/label_4.png';
import imgLabel_5 from 'assets/images/labels/label_5.png';

export const itemData = {
  Walls: {
    'Ready Made': [
      {
        item_id: 'wall_1_1',
        imgurl: imgWall_1_1,
      },
      {
        item_id: 'wall_1_2',
        imgurl: imgWall_1_2,
      },
      {
        item_id: 'wall_1_3',
        imgurl: imgWall_1_3,
      },
      {
        item_id: 'wall_1_4',
        imgurl: imgWall_1_4,
      },
      {
        item_id: 'wall_1_5',
        imgurl: imgWall_1_5,
      },
    ],
    'Design Your Own - Walls': [
      {
        item_id: 'wall_2_1',
        imgurl: imgWall_2_1,
      },
      {
        item_id: 'wall_2_2',
        imgurl: imgWall_2_2,
      },
      {
        item_id: 'wall_2_3',
        imgurl: imgWall_2_3,
      },
    ],
  },
  'Tables & Chairs': {
    Tables: [
      {
        item_id: 'table_1',
        imgurl: imgTable_1,
      },
      {
        item_id: 'table_2',
        imgurl: imgTable_2,
      },
    ],
    Chairs: [
      {
        item_id: 'chair_1',
        imgurl: imgChair_1,
      },
      {
        item_id: 'chair_2',
        imgurl: imgChair_2,
      },
      {
        item_id: 'chair_3',
        imgurl: imgChair_3,
      },
      {
        item_id: 'chair_4',
        imgurl: imgChair_4,
      },
    ],
  },
  'Labels & More': {
    'Text...': [
      {
        item_id: 'label_1',
        imgurl: imgLabel_1,
      },
      {
        item_id: 'label_2',
        imgurl: imgLabel_2,
      },
      {
        item_id: 'label_3',
        imgurl: imgLabel_3,
      },
      {
        item_id: 'label_4',
        imgurl: imgLabel_4,
      },
      {
        item_id: 'label_5',
        imgurl: imgLabel_5,
      },
    ],
  },
};
const ItemGallery = () => {
  const [currentType, setCurrentItemType] = useState(0);

  const getCurrentItemGroupByType = (value) => {
    let keyData = Object.keys(itemData);

    return RleaseItemGroup(itemData[keyData[value]]);
  };

  const RleaseItemGroup = (data) => {
    let keyData = Object.keys(data);
    let resultData = [];

    for (let i = 0; i < keyData.length; i++) {
      resultData.push(
        <div key={i}>
          <div className='itemgroup-title'>{keyData[i]}</div>
          <div className='itemgroup-body'>
            {' '}
            {data[keyData[i]].map((item, index) => {
              return (
                <div key={index} className='gallery-item'>
                  <img
                    src={item.imgurl}
                    onDrag={(e) => onDragStart(e, item.imgurl)}
                  />
                </div>
              );
            })}
          </div>
        </div>,
      );
    }

    return resultData;
  };

  const onDragStart = (event, value) => {
    event.dataTransfer.setData('text', value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentItemType(newValue);
  };

  return (
    <div className='item-gallery-container'>
      <Box sx={{width: '100%'}}>
        <Tabs
          value={currentType}
          onChange={handleTabChange}
          indicatorColor='secondary'
          textColor='inherit'
          variant='fullWidth'
          aria-label='full width tabs example'
          className='design-tab gallery-tab'>
          <Tab label='Walls' />
          <Tab label='Tables & Chairs' />
          <Tab label='More' />
        </Tabs>
      </Box>
      <div className='gallery-panel'>
        <div className='panel-title'>
          <Typography
            variant='h5'
            sx={{
              fontFamily: 'Futura',
            }}>
            {currentType == 0 && 'Wall Shape'}
            {currentType == 1 && 'Tables & Chairs'}
            {currentType == 2 && 'Labels & More'}
          </Typography>
        </div>
        <div className='panel-body'>
          {getCurrentItemGroupByType(currentType)}
        </div>
      </div>
    </div>
  );
};

export default ItemGallery;
