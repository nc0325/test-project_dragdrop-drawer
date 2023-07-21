import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'antd';
import {useSelector} from 'react-redux';
import * as QRCodeGenerator from 'easyqrcodejs';
import AppCard from '../../../@crema/core/AppCard';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import './index.style.less';
// import QrLogo from '../../../assets/images/qr-code-logo.svg';

const QRCode = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [qrCodeRendered, setQrCodeRendered] = useState(false);
  const ref = useRef(null);

  const {account} = useSelector((state) => state.home);

  useEffect(() => {
    if (account) {
      //clear ref
      ref.current.innerHTML = '';
      new QRCodeGenerator(ref.current, {
        title: 'Remmsh | عرضك بوتسابك',
        titleFont: 'normal normal bold 90px Arial', // Title font
        titleColor: '#b71b4b', // Title Color
        titleBackgroundColor: '#fff', // Title Background
        titleHeight: 200, // Title height, include subTitle
        titleTop: 160, // Title draw position(Y coordinate), default is 30
        // === SubTitle
        text: `whatsapp://send?text=${account.name}&phone=966920023290`,
        width: 1024,
        height: 1024,
        // logoHeight: 1024 / 3, //remmsh logo
        // logoWidth: 1024 / 3.5, //remmsh logo
        logo: `${process.env.REACT_APP_FRONTEND_URL}/assets/images/whatsapp-logo.png`,
        correctLevel: QRCodeGenerator.CorrectLevel.H,
        onRenderingEnd(qrCodeOptions, dataURL) {
          setImageUrl(dataURL);
          ref.current.style.display = 'block';
          setQrCodeRendered(true);
        },
      });
    }
  }, [account, ref]);

  return (
    <AppCard
      heightFull
      className='sub-card qr-code-card'
      cover={
        <div ref={ref} style={{display: 'none'}} className='qr-code-image' />
      }
      actions={[
        <Button
          disabled={!qrCodeRendered}
          href={imageUrl}
          download={`${account?.name}-whtsapp-qr-code`}
          name={`${account?.name}-whtsapp-qr-code`}
          type='primary'
          size='small'
          key={1}>
          <IntlMessages id='common.download' />
        </Button>,
      ]}></AppCard>
  );
};

export default QRCode;
