import Accordion from '@mui/material/Accordion';
import {Box, useTheme, Typography} from '@mui/material';
import {tokens} from '../../theme';
import {DataGrid} from '@mui/x-data-grid';
import {mockDataArrived} from '../../data/mockData';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IntlMessages from '@crema/utility/IntlMessages';

const Grid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {field: 'id', headerName: ''},
    {
      field: 'time',
      headerName: 'Time',
      flex: 1,
      cellClassName: 'time-column--cell',
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.time' />
        </Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.name' />
        </Typography>
      ),
    },
    {
      field: 'number_of_peopele',
      headerName: 'No. of Peopele',
      flex: 1,
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.number_of_peopele' />
        </Typography>
      ),
    },
    {
      field: 'table_number',
      headerName: 'Table No.',
      flex: 1,
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.table_number' />
        </Typography>
      ),
      //   renderCell: (params) => (
      //     <Typography color={colors.greenAccent[500]}>
      //       ${params.row.cost}
      //     </Typography>
      //   ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.status' />
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          fontWeight='bold'
          variant='h6'
          color={
            params.row.status === 'Confirmed'
              ? colors.greenAccent[500]
              : 'white'
          }>
          {params.row.status}
        </Typography>
      ),
    },
    {
      field: 'comments',
      headerName: 'Comments',
      flex: 1,
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.comments' />
        </Typography>
      ),
    },
    {
      field: 'reservation_notes',
      headerName: 'Reservation Notes',
      flex: 1,
      renderHeader: () => (
        <Typography fontWeight='bold' variant='h4' color='white'>
          <IntlMessages id='tableSys.reservation_notes' />
        </Typography>
      ),
    },
  ];
  return (
    <Box m={'20px'} maxHeight='false'>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: '#45276B',
          borderRadius: '0',
        }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} color='white'>
          <Typography
            variant='h5'
            color='white'
            fontWeight='bold'
            // sx={{ mb: "5px" }}
          >
            <IntlMessages id='tableSys.arrived' />
          </Typography>
        </AccordionSummary>

        <Box
          m='0 0 0 0'
          height='25vh'
          sx={{
            '.MuiDataGrid-row': {
              backgroundColor: 'rgba(105, 91, 131, 0.5);',
            },
            '.MuiDataGrid-row:nth-child(odd)': {
              backgroundColor: 'rgba(186, 182, 193, 0.6)',
            },
            '& .MuiDataGrid-root': {
              // border: "none",
            },
            '& .MuiDataGrid-cell': {
              borderRight: '2px solid #EDEDED',
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#695B83',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}>
          <DataGrid rows={mockDataArrived} columns={columns} hideFooter />
        </Box>
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: '#45276B',
          borderRadius: '0',
        }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} color='white'>
          <Typography
            variant='h5'
            color='white'
            fontWeight='bold'
            // sx={{ mb: "5px" }}
          >
            <IntlMessages id='tableSys.upcoming' />
          </Typography>
        </AccordionSummary>
        <Box
          m='0 0 0 0'
          height='25vh'
          sx={{
            '.MuiDataGrid-row': {
              backgroundColor: 'rgba(105, 91, 131, 0.5);',
            },
            '.MuiDataGrid-row:nth-child(odd)': {
              backgroundColor: 'rgba(186, 182, 193, 0.6)',
            },
            '& .MuiDataGrid-root': {
              // border: "none",
            },
            '& .MuiDataGrid-cell': {
              borderRight: '2px solid #EDEDED',
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#695B83',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}>
          <DataGrid rows={mockDataArrived} columns={columns} hideFooter />
        </Box>
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: '#45276B',
          borderRadius: '0',
        }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} color='white'>
          <Typography
            variant='h5'
            color='white'
            fontWeight='bold'
            // sx={{ mb: "5px" }}
          >
            <IntlMessages id='tableSys.seated' />
          </Typography>
        </AccordionSummary>
        <Box
          m='0 0 0 0'
          height='20vh'
          sx={{
            '.MuiDataGrid-row': {
              backgroundColor: 'rgba(105, 91, 131, 0.5);',
            },
            '.MuiDataGrid-row:nth-child(odd)': {
              backgroundColor: 'rgba(186, 182, 193, 0.6)',
            },
            '& .MuiDataGrid-root': {
              // border: "none",
            },
            '& .MuiDataGrid-cell': {
              borderRight: '2px solid #EDEDED',
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#695B83',
              borderBottom: 'none',
              fontWeight: '100',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}>
          <DataGrid rows={mockDataArrived} columns={columns} hideFooter />
        </Box>
      </Accordion>
    </Box>
  );
};

export default Grid;
