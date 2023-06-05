import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core';
import { DetailAutomationsDialogProps } from '../type';
import { HighlightOff } from '@material-ui/icons';
import { DetailAutomationStyle } from '../styles';

export const TriggerList = ({ triggerList, handleDelete }) => {
  const classes = DetailAutomationStyle();

  if (!triggerList) return null

  return (
    <Box className={classes.triggerListContainer}>
      {triggerList?.map((trigger) =>
        <Box
          key={trigger.id}
          className={classes.triggerBox}
        >
          {handleDelete &&
            <IconButton
              className={classes.iconButton}
              onClick={() => handleDelete(trigger.id)}
            >
              <HighlightOff />
            </IconButton>
          }
          <Typography variant="body1" className={classes.typography}><strong>Id: </strong> {trigger.id}</Typography>
          <Typography variant="body1" className={classes.typography}><strong>StartTimeUtc:</strong> {trigger.startTimeUtc?.split('.')[0].replace("T", " ")}</Typography>
          <Typography variant="body1" className={classes.typography}><strong>Interval:</strong> {trigger.interval}</Typography>
          <Typography variant="body1" className={classes.typography}><strong>Description:</strong> {trigger.description}</Typography>
          <Typography variant="body1" className={classes.typography}><strong>IsEnabled:</strong> {`${trigger.isEnabled}`}</Typography>
          <Typography variant="body1" className={classes.typography}><strong>IsMet:</strong> {`${trigger.isMet}`}</Typography>
          <Typography variant="body1" className={classes.typography}><strong>Type:</strong> {trigger.type.match(/DHI\.Services\.Jobs\.Automations\.Triggers\.(\w+),/)[1]}</Typography>
        </Box>
      )}
    </Box>)
}

const DetailAutomationsDialog: FC<DetailAutomationsDialogProps> = ({ open, onClose, automation }) => {
  const classes = DetailAutomationStyle();

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xl'>
      <Paper elevation={3} className={classes.paperStyle}>
        <DialogTitle>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h4' align='center'>{automation?.taskId}</Typography>
            <Typography variant='h5' align='center'>{automation?.name}</Typography>
            <Typography variant='h6' align='center'>{automation?.group}</Typography>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <DialogContentText>
              <Typography variant="body1" className={classes.typography}><strong>Task Id:</strong> {automation?.taskId}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Full Name:</strong> {automation?.fullName}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Name:</strong> {automation?.name}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Group:</strong> {automation?.group}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Is Enabled:</strong> {`${automation?.isEnabled}`}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Priority:</strong> {automation?.priority}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Host Group:</strong> {automation?.hostGroup}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Tag:</strong> {automation?.tag}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>WorkflowInputParameters:</strong> {automation?.workflowInputParametersFilePath}</Typography>
              <Typography variant="body1" className={classes.typography}>
                <strong>Parameters:</strong>
                {Object.entries(automation?.parameters || {}).map(([key, value], index) => (
                  <span key={key}>
                    <br />
                    {index + 1}. {key}: {value}
                  </span>
                ))}
              </Typography>
              <Typography variant="body1" className={classes.typography}><strong>Updated:</strong> {automation?.updated.split('.')[0].replace("T", " ")}</Typography>
            </DialogContentText>
            <Paper className={classes.dialogContentPaper}>
              <Box className={classes.boxStyle}>
                <Typography variant='h6' className={classes.typography}>Trigger List</Typography>
                <Typography variant="body1" className={classes.typography} ><strong>Trigger Condition:</strong> {automation?.triggerCondition.conditional}</Typography>
                <Typography variant="body1" className={classes.typography}><strong>Final Condition:</strong> {`${automation?.triggerCondition.isMet ?? false}`}</Typography>
              </Box>
              <TriggerList triggerList={automation?.triggerCondition.triggers} handleDelete={undefined} />
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default DetailAutomationsDialog;
