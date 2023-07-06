import {
  Box,
  CircularProgress,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';
import {
  Cancel,
  CancelScheduleSend,
  CheckCircle,
  Error,
  HelpOutline,
  HourglassEmpty,
  TimerOffOutlined,
} from '@material-ui/icons';
import React, { useMemo } from 'react';

const StatusCell = ({ row }: { row: any }) => {
  const { status, progress } = row;

  return useMemo(() => {
    switch (status) {
      case 'Completed':
        return (
          <Tooltip title={status}>
            <CheckCircle style={{ color: green[300] }} />
          </Tooltip>
        );
      case 'InProgress':
        return (
          <Tooltip title={status}>
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
                <Typography variant="caption" component="div" style={{ fontSize: 10 }}>{progress ? `${progress}%` : ''}</Typography>
              </Box>
            </Box>
          </Tooltip>
        );
      case 'Pending':
        return (
          <Tooltip title={status}>
            <HourglassEmpty style={{ color: yellow[900] }} />
          </Tooltip>
        );
      case 'Error':
        return (
          <Tooltip title={status}>
            <Error style={{ color: red[300] }} />
          </Tooltip>
        );
      case 'Cancelled':
        return (
          <Tooltip title={status}>
            <Cancel style={{ color: yellow[900] }} />
          </Tooltip>
        );
      case 'Cancelling':
      case 'Cancel':
        return (
          <Tooltip title={status}>
            <CancelScheduleSend style={{ color: yellow[900] }} />
          </Tooltip>
        );
      case 'Not Running':
        return (
          <Tooltip title={status}>
            <TimerOffOutlined style={{ color: yellow[900] }} />
          </Tooltip>
        );
      default:
        return (
          <Tooltip title={status}>
            <HelpOutline style={{ color: yellow[900] }} />
          </Tooltip>
        );
    }
  }, [status]);
};

export default StatusCell;
