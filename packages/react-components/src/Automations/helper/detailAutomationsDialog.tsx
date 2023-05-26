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
import { AutomationData } from '../AutomationsList/type';
import { HighlightOff } from '@material-ui/icons';

interface DetailAutomationsDialogProps {
  open: boolean;
  onClose: () => void;
  automation?: AutomationData
}

export const TriggerList = ({ triggerList, handleDelete }) => {
  if (!triggerList) return null
  return (<Box style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {triggerList?.map((trigger) =>
      <>
        <Box
          key={trigger.id}
          sx={{
            position: 'relative',
            border: '1px solid lightgray',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px'
          }}
        >
          {handleDelete &&
            <IconButton
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                zIndex: 1,
                padding: 0,
              }}
              onClick={() => handleDelete(trigger.id)}
            >
              <HighlightOff />
            </IconButton>
          }
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Id: </strong> {trigger.id}</Typography>
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>StartTimeUtc:</strong> {trigger.startTimeUtc}</Typography>
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Interval:</strong> {trigger.interval}</Typography>
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Description:</strong> {trigger.description}</Typography>
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>IsEnabled:</strong> {`${trigger.isEnabled}`}</Typography>
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>IsMet:</strong> {`${trigger.isMet}`}</Typography>
          <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Type:</strong> {trigger.type}</Typography>
        </Box>
      </>
    )}
  </Box>)
}

const DetailAutomationsDialog: FC<DetailAutomationsDialogProps> = ({ open, onClose, automation }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xl'>
      <Paper elevation={3} style={{ padding: '10px' }}>
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
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Task Id:</strong> {automation?.taskId}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Full Name:</strong> {automation?.fullName}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Name:</strong> {automation?.name}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Group:</strong> {automation?.group}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Is Enabled:</strong> {`${automation?.isEnabled}`}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Priority:</strong> {automation?.priority}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Host Group:</strong> {automation?.hostGroup}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Tag:</strong> {automation?.tag}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>WorkflowInputParameters:</strong> {automation?.workflowInputParametersFilePath}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Parameters:</strong> {automation?.parameters.utcNow}</Typography>
              <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Updated:</strong> {automation?.updated}</Typography>
            </DialogContentText>
            <Paper style={{ padding: '15px' }}>
              <Box style={{ marginBottom: '15px' }}>
                <Typography variant='h6' style={{ lineHeight: '2' }}>Trigger List</Typography>
                <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Trigger Condition:</strong> {automation?.triggerCondition.conditional}</Typography>
                <Typography variant="body1" style={{ lineHeight: '2' }}><strong>Final Condition:</strong> {`${automation?.triggerCondition.isMet}`}</Typography>
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
