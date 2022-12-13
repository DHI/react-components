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
import { failJob } from '../../../api/Jobs/JobsApi';
import { DataSource } from '../../../api/types';

const StatusCell = ({ row }: { row: any } ) => {
  const { status, progress, taskId, token='', id=''} = row;
  const data = {
    hostJobLog:'', 
    hostId:'', 
    connectionJobLog:'',
    tokenJobLog:'',
    id:''
  }
  const [dataSource, setDataSource] = useState<DataSource>();
  console.log(dataSource);
  
 
  

  const [dialog, setDialog] = useState<GeneralDialogProps>({
    showDialog: false,
    cancelLabel: 'No' || 'Cancel',
    confirmLabel: 'Yes' || 'Confirm',
    dialogId: '',
    title: '',
    message: '',
    onConfirm: null,
  });
  // console.log(dialog);
  

  const closeDialog = () => {
    setDialog({
      ...dialog,
      showDialog: false,
    });
    console.log('close');
  };

  const fetchJobList = (dataSource:DataSource, token: string, id: any) => {
    closeDialog();
    console.log('dataSource: ', dataSource.host);
        failJob(
          {
            host: data.hostId || data.hostJobLog,
            connection: data.connectionJobLog,
          },
          data.tokenJobLog||token,
          data.id||id, 
        );
  };

  const executeDialog = (dataSource:DataSource , token: string, id: any) => {
     setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'execute',
      title: 'alert',
      message: `Are you sure you want to set the Status of this job ${taskId} to Error`,
      onConfirm: () => fetchJobList(dataSource, token, id),
    });
    // console.log('open');
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
          <Tooltip title={status} onClick={() => executeDialog(dataSource, token, id)}>
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
                onConfirm={dialog.onConfirm}
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
