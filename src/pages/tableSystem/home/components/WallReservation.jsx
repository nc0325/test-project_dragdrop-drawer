import {Typography, Box} from '@mui/material';
import PropTypes from 'prop-types';

const WallReservation = ({title, style}) => {
  return (
    <Box
      sx={[
        {
          backgroundColor: '#615387',
          borderRadius: '8px',
          padding: '23px 36px',
          transform: 'rotateY(0deg) rotate(90deg)',
        },
        style,
      ]}>
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '16px',
          lineHeight: '22px',
          color: '#ffffff',
        }}>
        {title}
      </Typography>
    </Box>
  );
};
WallReservation.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
};

export default WallReservation;
