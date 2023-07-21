import React from 'react';
import Icon from '@ant-design/icons';

const LogoutCancelButtonIcon = (props) => {
  const LogoutCancelButtonIconSvg = () => (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13 1L1 13M1 1L13 13'
        stroke='#808080'
        strokeOpacity='0.6'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return <Icon component={LogoutCancelButtonIconSvg} {...props} />;
};

export default LogoutCancelButtonIcon;
