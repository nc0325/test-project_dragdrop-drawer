import React from 'react';
import Icon from '@ant-design/icons';

const LogoutIcon = (props) => {
  const LogoutIconSvg = () => (
    <svg
      width='36'
      height='39'
      viewBox='0 0 36 39'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18 1.5V19M29.13 9.62C31.3321 11.8229 32.8317 14.6293 33.439 17.6843C34.0463 20.7394 33.7341 23.9059 32.5418 26.7836C31.3496 29.6612 29.3309 32.1207 26.7409 33.8511C24.151 35.5815 21.1061 36.5051 17.9912 36.5051C14.8764 36.5051 11.8315 35.5815 9.24152 33.8511C6.65156 32.1207 4.63284 29.6612 3.44061 26.7836C2.24838 23.9059 1.93617 20.7394 2.54347 17.6843C3.15077 14.6293 4.65031 11.8229 6.85247 9.62'
        stroke='#848484'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return <Icon component={LogoutIconSvg} {...props} />;
};

export default LogoutIcon;
