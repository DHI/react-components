import { Grid, makeStyles, Paper, TextareaAutosize, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { JobDetailProps } from './types';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const textAreaPlaceholder = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

const JobDetail = ({ detail, onClose }: JobDetailProps) => {
  const classes = useStyles();

  const displayBlock = (detail) => {

    return Object.entries(detail).map(([key, value], i) => {

      if (key !== 'taskId' && key !== 'id') {
        return (<Grid item xs={4} key={i}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="subtitle1"><strong>{key}: </strong></Typography>
            <Typography variant='caption' gutterBottom>{value}</Typography>
          </Paper>
        </Grid>
        )
      } else {
        return null;
      }

    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>
              Job Detail: {detail.taskId}
            </Typography>
            <Typography variant='caption'>id: {detail.id}</Typography>
            <button onClick={onClose}>x</button>
          </Paper>
        </Grid>
        {displayBlock(detail)}

        <TextareaAutosize aria-label="textarea" placeholder={textAreaPlaceholder} style={{ width: '100%' }} />

      </Grid>

    </div>
  );
};

export default JobDetail;
