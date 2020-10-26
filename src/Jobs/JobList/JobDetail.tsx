import { Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { setUtcToZonedTime } from '../../utils/Utils';
import { JobDetailProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
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
}));

const JobDetail = ({ detail, timeZone, dateTimeFormat, onClose }: JobDetailProps) => {
  const classes = useStyles();

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

  const structureLog = () => {
    const log = detail?.logs
      ?.map(
        (item) =>
          // eslint-disable-next-line prettier/prettier
        `${setUtcToZonedTime(item.dateTime, timeZone, dateTimeFormat)} - [${item.logLevel}] - ${item.text} \n`
      )
      .join('');

    return log;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">Timezone: {timeZone}</Typography>
            <Typography variant="h5">Job Detail: {detail.taskId}</Typography>
            <Typography variant="caption">id: {detail.id}</Typography>
            <button onClick={onClose}>x</button>
          </Paper>
        </Grid>
        {displayBlock(detail)}

        <textarea
          placeholder=""
          style={{ width: '100%', minHeight: 400, overflow: 'scroll', whiteSpace: 'nowrap' }}
          defaultValue={structureLog()}
        />
      </Grid>
    </div>
  );
};

export default JobDetail;
