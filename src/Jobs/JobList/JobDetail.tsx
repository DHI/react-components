import { Grid, Paper, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import React, { useCallback, useEffect, useState } from 'react';
import { setUtcToZonedTime } from '../../utils/Utils';
import { JobDetailStyles } from './styles';
import { JobDetailProps } from './types';

const JobDetail = ({ detail, textareaScrolled, timeZone, dateTimeFormat, onClose }: JobDetailProps) => {
  const classes = JobDetailStyles();
  const [structuredLogs, setStructuredLogs] = useState('');
  const [scrollHeight, setScrollHeight] = useState(null)

  const displayBlock = (detail) => {
    return (
      <div className={classes.paper}>
        {Object.entries(detail).map(([key, value], i) => {
          if (key !== 'taskId' && key !== 'id' && key !== 'logs' && value !== '') {
            return (
              <span key={i} className={classes.item}>
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

  const textareaInputRef = useCallback(node => {
    if (node !== null) {
      if (textareaScrolled) {
        setScrollHeight(node.scrollHeight)
        node.scrollTop = scrollHeight;
      } else {
        node.scrollTop = 0;
      }
    }
  }, [textareaScrolled, scrollHeight])

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

      <textarea name={detail.id} placeholder="" ref={(node) => textareaInputRef(node)} className={classes.textarea} defaultValue={structuredLogs} />
    </div>
  );
};

export default JobDetail;
