import {
  Box,
  CircularProgress,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';
import { Cancel, CancelScheduleSend, CheckCircle, Error, HelpOutline, HourglassEmpty } from '@material-ui/icons';
import React, { useMemo, useState } from 'react';
import GeneralDialog from '../../../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../..//../common/GeneralDialog/types';

const StatusCell = ({ row }: { row: any }) => {
  const { status, progress } = row;

  const [dialog, setDialog] = useState<GeneralDialogProps>({
    showDialog: false,
    cancelLabel: 'No',
    confirmLabel: 'Yes',
    dialogId: '',
    title: '',
    message: '',
    onConfirm: null,
  });

  // const fetchJobList = () => {
    
  // executeJobQuery(dataSources, token, id).subscribe(
  //   (response) => {
  //     const logs = response.map((item) => item.data);
  //   }
  // )
  // };

  const executeDialog = () => {
    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'execute',
      title: 'alert',
      message: 'Are you sure you want to set the Status of this job to Error',
      // onConfirm: () => onEditScenario(),
    });
    console.log('open');
  };
  const closeDialog = () => {
    setDialog({
      ...dialog,
      showDialog: false,
    });
    console.log('close');
  };

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
          <Tooltip title={status} onClick={executeDialog}>
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
                <Typography variant="caption" component="div" style={{ fontSize: 10 }}>{`${progress}%`}</Typography>
              </Box>
              <GeneralDialog
                dialogId={dialog.dialogId}
                title={dialog.title}
                message={dialog.message}
                cancelLabel={dialog.cancelLabel}
                confirmLabel={dialog.confirmLabel}
                showDialog={dialog.showDialog}
                onConfirm={executeDialog}
                onCancel={closeDialog}
              />
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
      default:
        return (
          <Tooltip title={status}>
            <HelpOutline style={{ color: yellow[900] }} />
          </Tooltip>
        );
    }
  }, [status, dialog]);
};

export default StatusCell;
