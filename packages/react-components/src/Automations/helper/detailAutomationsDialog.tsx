import React, { FC } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { DetailAutomationsDialogProps } from '../type';
import { CloseOutlined, Delete, MoreVert, RadioButtonUnchecked } from '@material-ui/icons';
import { DetailAutomationStyle } from '../styles';
import { TriggerCell } from './cell';

export const TriggerList = ({ triggerList, handleDelete, editMode = true, handleChangeStatus }) => {
  const classes = DetailAutomationStyle();

  const [anchorEl, setAnchorEl] = React.useState({});

  const handleClick = (event, id) => {
    setAnchorEl(prev => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id) => {
    setAnchorEl(prev => {
      const newAnchor = { ...prev };
      delete newAnchor[id];
      return newAnchor;
    });
  };

  const handleConfirmDelete = (id) => {
    handleClose(id);
    handleDelete(id);
  }

  if (!triggerList) return null

  return (
    <Box className={classes.triggerListContainer}>
      {triggerList.length === 0 && (
        <Typography align='center' className={classes.disabledTypography}>
          Not available, please create a new trigger
        </Typography>
      )}
      {triggerList?.map((trigger) =>
        <Box key={trigger.id} className={classes.triggrerListWrapper}>
          <Paper className={classes.paperListWrapper}>
            <Box className={classes.triggerBox}>
              <Typography variant='body1' className={`${classes.flexBox} ${trigger.isMet ? classes.greenText : classes.redText}`}>
                <RadioButtonUnchecked className={classes.iconRadio} />
                {trigger.id}
              </Typography>
              <Box className={classes.flexBox}>
                <Typography variant="body1" className={classes.typography}>{trigger.isEnabled ? 'Enable' : 'Disable'}</Typography>
                {handleChangeStatus && handleDelete && <IconButton size='small' onClick={(e) => handleClick(e, trigger.id)}>
                  <MoreVert />
                </IconButton>}
                <Popover
                  id={`popover-${trigger.id}`}
                  open={Boolean(anchorEl[trigger.id])}
                  anchorEl={anchorEl[trigger.id]}
                  onClose={() => handleClose(trigger.id)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <List>
                    <ListItem>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={trigger.isEnabled}
                            onChange={() => handleChangeStatus(trigger.id)}
                            name='isEnabled'
                            color='primary'
                          />
                        }
                        label={<Typography variant="body1">Enabled</Typography>}
                        labelPlacement="start"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => handleConfirmDelete(trigger.id)}>
                      <ListItemIcon>
                        <Delete />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            </Box>
            <Divider />
            <Box className={classes.paperStyle}>
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
    <Dialog open={open} onClose={onClose} maxWidth='md'>
      <IconButton size='small' onClick={onClose} className={classes.iconClose} >
        <CloseOutlined />
      </IconButton>
      <Paper elevation={3}>
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant='h6'>Automation Detail</Typography>
        </DialogTitle>
        <DialogContent className={classes.contentTextWrapper}>
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
              <Typography variant="body1" className={classes.typography}><strong>Requested Time:</strong> {automation?.requested?.split('.')[0].replace("T", " ")}</Typography>
              <Typography variant="body1" className={classes.typography}><strong>Current Status:</strong> {automation?.currentStatus}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.typography}><strong>Tag:</strong> {automation?.tag}</Typography>
              <Typography variant="body1" className={classes.typography}>
                <strong>Task Parameters:</strong>
                {Object.entries(automation?.taskParameters || {}).map(([key, value], index) => (
                  <span key={key}>
                    <br />
                    {index + 1}. <strong>{key}</strong>: {value}
                  </span>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent className={classes.paperStyle}>
          <Box className={classes.flexBoxColumn}>
            <Box className={`${classes.contentBoxWrapper} ${automation?.triggerCondition?.isMet ? classes.greenBackground : classes.redBackground}`}>
              <Typography className={classes.whiteText}>
                Trigger Operation
              </Typography>
              <Typography className={classes.whiteTypography}>
                Final Condition :<strong>{`${automation?.triggerCondition?.isMet ?? false}`}</strong>
              </Typography>
            </Box>
            <Box className={classes.conditionalBox}>
              <TriggerCell
                input={automation?.triggerCondition?.conditional}
                triggerList={automation?.triggerCondition?.triggers}
              />
            </Box>
            <TriggerList editMode={false} triggerList={automation?.triggerCondition?.triggers} handleDelete={undefined} handleChangeStatus={undefined} />
          </Box>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default DetailAutomationsDialog;
