import {useEffect, useRef, useState} from 'react';
import {PositionableContainer} from 're-position';
import {useKeyPress} from 'hooks/useKeyPress';
import './style.css';

const DesignBoard = () => {
  const [itemList, setItemList] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const delteKeyPressed = useKeyPress('Delete');
  const boardRef = useRef(null);

  useEffect(() => {
    if (delteKeyPressed === true) {
      let data = itemList.filter(
        (item, index) => index != currentItemIndex - 1,
      );
      setItemList([...data]);
    }
  }, [delteKeyPressed]);

  const getMeta = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      callback(this.width, this.height);
    };
  };

  const addItem = (srcurl, posx, posy, width, height) => {
    let data = itemList;
    let item = {
      imgUrl: srcurl,
      selected: true,
      position: {
        left: posx + '%',
        top: posy + '%',
        width: width + 'px',
        height: height + 'px',
        rotation: '0deg',
      },
    };
    data.push(item);
    setItemList([...data]);
    updateSelected(data.length - 1);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    let imageUrl = e.dataTransfer.getData('text');
    const rect = e.currentTarget.getBoundingClientRect();
    let x = ((e.pageX - rect.left) * 100) / rect.width;
    let y = ((e.pageY - rect.top) * 100) / rect.height;

    getMeta(imageUrl, (width, height) => {
      addItem(imageUrl, x, y, width, height);
    });
  };

  const parsePositionNumber = (parseValue, OffsetValue) => {
    let part = parseValue.slice(-1);
    if (part == '%') return (parseFloat(parseValue) * OffsetValue) / 100;
    else return parseFloat(parseValue);
  };

  const updatePosition = (selectedIndex, updatedPosition) => {
    if (
      (parseFloat(updatedPosition.left) * boardRef.current.offsetWidth) / 100 <
      20
    ) {
      updatedPosition.left = (20 * 100) / boardRef.current.offsetWidth + '%';
    }
    if (
      (parseFloat(updatedPosition.top) * boardRef.current.offsetHeight) / 100 <
      20
    ) {
      updatedPosition.top = (20 * 100) / boardRef.current.offsetHeight + '%';
    }
    if (
      parsePositionNumber(updatedPosition.left, boardRef.current.offsetWidth) >
      boardRef.current.offsetWidth - parseInt(updatedPosition.width) - 20
    ) {
      updatedPosition.left =
        100 -
        ((parseInt(updatedPosition.width) + 20) * 100) /
          boardRef.current.offsetWidth +
        '%';
    }
    if (
      parsePositionNumber(updatedPosition.top, boardRef.current.offsetHeight) >
      boardRef.current.offsetHeight - parseInt(updatedPosition.height) - 20
    ) {
      updatedPosition.top =
        100 -
        ((parseInt(updatedPosition.height) + 20) * 100) /
          boardRef.current.offsetHeight +
        '%';
    }

    let data = itemList.map((item, index) => {
      if (index == selectedIndex) {
        return {
          imgUrl: item.imgUrl,
          selected: item.selected,
          position: updatedPosition,
        };
      } else return item;
    });

    setItemList([...data]);
  };

  const updateSelected = (selectedIndex) => {
    setCurrentItemIndex(selectedIndex + 1);

    let data = itemList.map((item, index) => {
      if (index == selectedIndex) {
        return {
          imgUrl: item.imgUrl,
          selected: true,
          position: item.position,
        };
      } else {
        return {
          imgUrl: item.imgUrl,
          selected: false,
          position: item.position,
        };
      }
    });

    setItemList([...data]);
  };

  const onItemClicked = (itemIndex) => {
    updateSelected(itemIndex);
  };

  const handleBoardClick = (e) => {
    e.preventDefault();
    updateSelected(-1);
  };

  return (
    <div
      className='design-board'
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e)}
      ref={boardRef}>
      <div className='design-pane'>
        {itemList.map((item, index) => {
          return (
            <PositionableContainer
              movable
              resizable
              rotatable
              disabled={!item.selected}
              position={item.position}
              onUpdate={(position) => updatePosition(index, position)}
              key={index}
              onClick={() => onItemClicked(index)}>
              <img
                src={item.imgUrl}
                draggable={false}
                style={{width: '100%', height: '100%'}}
              />
            </PositionableContainer>
          );
        })}
        <div className='pane-back' onClick={handleBoardClick}></div>
      </div>
    </div>
  );
};

export default DesignBoard;
