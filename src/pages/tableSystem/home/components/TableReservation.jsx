import {Typography, Box} from '@mui/material';
import PropTypes from 'prop-types';
import {tableType} from 'utils/constants';

const tableColor = {
  [tableType.occupied]: '#C96767',
  [tableType.reserved]: '#6FA4F2',
  [tableType.vacant]: '#98C98F',
};

const TableReservation = ({
  title,
  tableNumber,
  price,
  style,
  status = tableType.occupied,
  isCircle = false,
}) => {
  return (
    <Box
      sx={[
        {
          backgroundColor: tableColor[status],
          border: '1px solid #FFFFFF',
          borderRadius: isCircle ? '50%' : '8px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingTop: '5px',
          paddingBottom: '5px',
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
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '12px',
          lineHeight: '22px',
          color: '#ffffff',
        }}>
        {tableNumber}
      </Typography>
      <Box
        sx={{
          backgroundColor: '#7757BB',
          borderRadius: '8px',
          padding: '0 8px',
          position: 'absolute',
          bottom: '-15px',
        }}>
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '12px',
            lineHeight: '22px',
            color: '#ffffff',
          }}>
          {price}
        </Typography>
      </Box>
    </Box>
  );
};
TableReservation.propTypes = {
  title: PropTypes.string,
  tableNumber: PropTypes.string,
  price: PropTypes.string,
  style: PropTypes.object,
  status: PropTypes.string,
  isCircle: PropTypes.bool,
};

export default TableReservation;
