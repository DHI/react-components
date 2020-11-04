import { Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { setUtcToZonedTime } from '../../utils/Utils';
import { JobDetailProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
    display: 'flex',
    padding: '16px 0',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    justifyContent: 'space-evenly',
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    position: 'absolute',
    right: '0',
    cursor: 'pointer',
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

const JobDetail = ({ detail, textareaScrolled, timeZone, dateTimeFormat, onClose }: JobDetailProps) => {
  const classes = useStyles();
  const textareaInput = useRef(null);
  const [structuredLogs, setStructuredLogs] = useState('');
  const [scrollHeight, setScrollHeight] = useState(null)

  const displayBlock = (detail) => {
    return (
      <div className={classes.paper}>
        {Object.entries(detail).map(([key, value], i) => {
          if (key !== 'taskId' && key !== 'id' && key !== 'logs') {
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

  useEffect(() => {
    if (textareaScrolled && textareaInput.current) {
      textareaInput.current.scrollTop = textareaInput.current.scrollHeight;
    }
    // console.log('render');
    // console.log(textareaInput.current);
    // console.log(textareaInput.current.scrollHeight);


  }, [textareaScrolled, detail.logs])

  const textareaInputRef = useCallback(node => {
    console.log('render');
    if (node !== null && textareaScrolled) {
      setScrollHeight(node.scrollHeight)
      node.scrollTop = scrollHeight;
    }
    console.log(scrollHeight)
  }, [textareaScrolled, detail.logs])

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

      <textarea name={detail.id} placeholder="" ref={textareaInputRef} className={classes.textarea} defaultValue={structuredLogs} />
    </div>
  );
};

export default JobDetail;
