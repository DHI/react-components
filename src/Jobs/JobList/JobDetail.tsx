import { Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import React, { useEffect, useState } from 'react';
import { setUtcToZonedTime } from '../../utils/Utils';
import { JobDetailProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
    display: 'flex',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  textarea: {
    width: '100%',
    minHeight: 400,
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    height: 'calc(100% - 140px)',
    marginTop: theme.spacing(2),
  },
}));

const JobDetail = ({ detail, timeZone, dateTimeFormat, onClose }: JobDetailProps) => {
  const classes = useStyles();
  const [structuredLogs, setStructuredLogs] = useState('');

  const displayBlock = (detail) => {
    return (
      <div className={classes.paper}>
        {Object.entries(detail).map(([key, value], i) => {
          if (key !== 'taskId' && key !== 'id' && key !== 'logs') {
            return (
              <span className={classes.item}>
                {key}: <strong>{value}</strong>
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
        (item) =>
          `${setUtcToZonedTime(item.dateTime, timeZone, dateTimeFormat)} - [${item.logLevel}] - ${item.text} \n`,
      )
      .join('');

    setStructuredLogs(log);
  };

  useEffect(() => {
    formatLog();
  }, [detail.logs]);

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle1">Timezone: {timeZone}</Typography>
          <Typography variant="h5">Job Detail: {detail.taskId}</Typography>
          <Typography variant="caption">id: {detail.id}</Typography>
          <button className={classes.button} onClick={onClose}>
            <CancelOutlinedIcon />
          </button>
        </Paper>
      </Grid>
      {displayBlock(detail)}

      <textarea placeholder="" className={classes.textarea} defaultValue={structuredLogs} />
    </div>
  );
};

export default JobDetail;
