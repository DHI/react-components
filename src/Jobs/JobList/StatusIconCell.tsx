import React from 'react';
import { Box, CircularProgress, Tooltip, Typography } from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';
import { Cancel, CancelScheduleSend, CheckCircle, Error, HelpOutline, HourglassEmpty } from '@material-ui/icons';

const StatusIconCell = ({ value, cell }: { value: string; cell: any }) => {
  switch (value) {
    case 'Completed':
      return (
        <Tooltip title={value}>
          <CheckCircle style={{ color: green[300] }} />
        </Tooltip>
      );
    case 'InProgress':
      return (
        <Tooltip title={value}>
          <Box position="relative" display="inline-flex">
            <CircularProgress style={{ color: blue[900] }} variant={'indeterminate'} size={28} thickness={4} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                style={{ fontSize: 10 }}
              >{`${cell.row.original.progress}%`}</Typography>
            </Box>
          </Box>
        </Tooltip>
      );
    case 'Pending':
      return (
        <Tooltip title={value}>
          <HourglassEmpty style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Error':
      return (
        <Tooltip title={value}>
          <Error style={{ color: red[300] }} />
        </Tooltip>
      );
    case 'Cancelled':
      return (
        <Tooltip title={value}>
          <Cancel style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Cancelling':
    case 'Cancel':
      return (
        <Tooltip title={value}>
          <CancelScheduleSend style={{ color: yellow[900] }} />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={value}>
          <HelpOutline style={{ color: yellow[900] }} />
        </Tooltip>
      );
  }
};

export default StatusIconCell;
