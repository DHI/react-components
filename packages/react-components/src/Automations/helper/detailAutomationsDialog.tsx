import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core';
import { DetailAutomationsDialogProps } from '../type';
import { CloseOutlined, HighlightOff, RadioButtonUnchecked } from '@material-ui/icons';
import { DetailAutomationStyle } from '../styles';
import { TriggerCell } from './cell';

export const TriggerList = ({ triggerList, handleDelete, editMode = true }) => {
  const classes = DetailAutomationStyle();

  if (!triggerList) return null

  return (
    <Box className={classes.triggerListContainer}>
      {editMode && triggerList?.map((trigger) =>
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
      {!editMode && triggerList?.map((trigger) =>
        <Box
          key={trigger.id}
          style={{
            overflow: 'hidden',
          }}
        >
          <Paper style={{
            borderRadius: '10px',
            border: '1px solid rgba(217, 217, 217, 1)',
            boxShadow: '0 2px 4px rgba(217, 217, 217, 1)',
            marginTop: '10px',
          }}>
            <Box style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
              borderBottom: '1px solid rgba(217, 217, 217, 1)',
              padding: '10px',
              background: 'rgba(248, 248, 248, 1)',

            }}>
              <Typography
                variant='body1'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: trigger.isMet ? 'green' : 'red'
                }}>
                <RadioButtonUnchecked style={{ marginRight: '5px' }} />
                {trigger.id}
              </Typography>
              <Typography variant="body1" className={classes.typography}>{trigger.isEnabled ? 'Enable' : 'Disable'}</Typography>
            </Box>
            <Divider />
            <Box style={{ padding: '10px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="body1" className={classes.typography}><strong>Interval:</strong> {trigger.interval}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" className={classes.typography}><strong>StartTimeUtc:</strong> {trigger.startTimeUtc?.split('.')[0].replace("T", " ")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" className={classes.typography}><strong>Description:</strong> {trigger.description}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" className={classes.typography}><strong>Type:</strong> {trigger.type.match(/DHI\.Services\.Jobs\.Automations\.Triggers\.(\w+),/)[1]}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>)
}

const DetailAutomationsDialog: FC<DetailAutomationsDialogProps> = ({ open, onClose, automation }) => {
  const classes = DetailAutomationStyle();

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg'>
      <IconButton
        style={{
          position: 'absolute',
          right: '5px',
          top: '5px'
        }}
        size='small'
        onClick={onClose}
      >
        <CloseOutlined />
      </IconButton>
      <Paper elevation={3}>
        <DialogTitle style={{ padding: '5px 10px' }}>
          <Typography variant='h6'>Automation Detail</Typography>
        </DialogTitle>
        <DialogContent
          style={{
            background: 'rgba(248, 248, 248, 1)',
            overflowX: 'auto',
            overflowY: 'hidden',
            borderTop: '2px solid rgba(217, 217, 217, 1)',
            borderBottom: '2px solid rgba(217, 217, 217, 1)'
          }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography variant="body1" className={classes.typography}><strong>Task Id:</strong> {automation?.taskId}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Full Name:</strong> {automation?.fullName}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Name:</strong> {automation?.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" className={classes.typography}><strong>Group:</strong> {automation?.group}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Is Enabled:</strong> {`${automation?.isEnabled}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" className={classes.typography}><strong>Priority:</strong> {automation?.priority}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Host Group:</strong> {automation?.hostGroup}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" className={classes.typography}><strong>Tag:</strong> {automation?.tag}</Typography>
              <Typography variant="body1" className={classes.typography}>
                <strong>Task Parameters:</strong>
                {Object.entries(automation?.taskParameters || {}).map(([key, value], index) => (
                  <span key={key}>
                    <br />
                    {index + 1}. {key}: {value}
                  </span>
                ))}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.typography}><strong>Requested Time:</strong> {automation?.requested?.split('.')[0].replace("T", " ")}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Current Status:</strong> {automation?.currentStatus}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent style={{ padding: '10px' }}>
          <Box style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                border: '1px solid rgba(217, 217, 217, 1)',
                borderBottom: 'none',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                background: `${automation?.triggerCondition?.isMet ? 'green' : 'red'}`
              }}
            >
              <Typography style={{ color: 'white' }}>
                Trigger Operation
              </Typography>
              <Typography style={{ color: 'white', fontSize: '12px' }}>
                Final Condition :<strong>{`${automation?.triggerCondition?.isMet ?? false}`}</strong>
              </Typography>
            </Box>
            <Box
              style={{
                padding: '10px',
                border: '1px solid rgba(217, 217, 217, 1)',
                borderTop: 'none',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                minHeight: '20px',
                marginBottom: '10px'
              }}
            >
              <TriggerCell
                input={automation?.triggerCondition?.conditional}
                triggerList={automation?.triggerCondition?.triggers}
              />
            </Box>
            <TriggerList editMode={false} triggerList={automation?.triggerCondition?.triggers} handleDelete={undefined} />
          </Box>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default DetailAutomationsDialog;
