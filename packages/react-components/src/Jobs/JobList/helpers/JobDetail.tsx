import { Button, Grid, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { CancelOutlined, Close, Error } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { failJob } from '../../../api/Jobs/JobsApi';
import GeneralDialog from '../../../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../../../common/GeneralDialog/types';
import { zonedTimeFromUTC } from '../../../utils/Utils';
import { JobDetailStyles } from '../styles';
import { JobDetailProps } from '../types';

const JobDetail = ({ detail, timeZone, dateTimeFormat, onClose }: JobDetailProps) => {
  const classes = JobDetailStyles();
  const [structuredLogs, setStructuredLogs] = useState('');
  const [dialog, setDialog] = useState<GeneralDialogProps>({
    showDialog: false,
    cancelLabel: 'No',
    confirmLabel: 'Yes',
    dialogId: '',
    title: '',
    message: '',
    onConfirm: null,
  });

  const displayBlock = (detail) => {
    return (
      <div className={classes.paper}>
        {Object.entries(detail).map(([key, value], i) => {
          if (
            [
              'accountId',
              'status',
              'hostId',
              'duration',
              'delay',
              'requested',
              'started',
              'finished',
              'progress',
            ].includes(key) &&
            value !== ''
          ) {
            return (
              <span key={i} className={classes.item}>
                {key[0].toUpperCase() + key.slice(1)}: <strong>{value}</strong>
              </span>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };

  const formatLog = () => {
    const log = detail?.logs
      ?.map(
        (item) => `${zonedTimeFromUTC(item.dateTime, timeZone, dateTimeFormat)} - [${item.logLevel}] - ${item.text} \n`,
      )
      .join('');

    setStructuredLogs(log);
  };

  useEffect(() => {
    formatLog();
  }, [detail.logs]);

  const openFailJobDialog = () => {
    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'Fail Job',
      title: 'Alert',
      message: 'Are you sure you want to set the Status of this job to Error',
    });
    console.log('open');
  };

  const setJobToFailed = () => {
    console.log(detail.id);
    failJob({ connection: detail.connection, host: detail.host }, detail.token, detail.id);
    closeFailJobDialog();
  }

  const closeFailJobDialog = () => {
    setDialog({
      ...dialog,
      showDialog: false,
    });
    console.log('close');
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
      <div className={ classes.top }>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          {detail.status === 'InProgress' ? (
            <Button variant="contained" color="secondary" onClick={() => openFailJobDialog()}>
            Fail Job
            </Button>
            ) : null}
          <div style={{ flex: 1, display: 'flex-wrap' }}>
            <Typography>Task Id: {detail.taskId}</Typography>
            <Typography>Job Id: {detail.id}</Typography>
          </div>
        </div>
        <IconButton
          color="inherit"
          onClick={() => onClose()}
        >
          <Close fontSize="small" />
        </IconButton>
      </div>
      </Grid>
      {displayBlock(detail)}
      <textarea
        name={detail.id}
        placeholder=""
        className={classes.textarea}
        defaultValue={structuredLogs}
      />

      <GeneralDialog
        dialogId={dialog.dialogId}
        title={dialog.title}
        message={dialog.message}
        cancelLabel={dialog.cancelLabel}
        confirmLabel={dialog.confirmLabel}
        showDialog={dialog.showDialog}
        onConfirm={setJobToFailed}
        onCancel={closeFailJobDialog}
      />
    </div>
  );
};

export default JobDetail;
