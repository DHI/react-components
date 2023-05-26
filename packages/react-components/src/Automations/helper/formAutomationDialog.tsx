import React, { useEffect, useState } from 'react'
import { AutomationData } from '../AutomationsList/type';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { TriggerList } from './detailAutomationsDialog';
import DateInput from '../../common/DateInput/DateInput';
import { ExpandMore } from '@material-ui/icons';
import { DUMMY_DATA_AUTOMATIONS } from '../AutomationsList/dummyData';
import { ITriggerCondition } from '../AutomationsList/type'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    '& .MuiOutlinedInput-input': {
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '0.875rem',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
    },
  },
}));


interface IFormAutomationDialog {
  open: boolean;
  onClose: () => void;
  automation?: AutomationData
}

interface ITriggerParameter {
  triggerType: string,
  triggerValues: any,
  setTriggerValues: (value) => void
}

const DUMMY = DUMMY_DATA_AUTOMATIONS[0]

const FormAutomationDialog: React.FC<IFormAutomationDialog> = ({
  open, onClose, automation
}) => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    name: '',
    group: '',
    taskId: '',
    hostId: '',
    priority: 0,
    enabled: false,
  });
  const [trigger, setTrigger] = useState({
    triggerCondition: '',
    triggerId: '',
    type: '',
    enabled: false
  })
  const [triggerParameters, setTriggerParameters] = useState({});
  const [inputTriggers, setInputTriggers] = useState<ITriggerCondition>({
    triggers: [],
    isMet: false,
    conditional: ''
  })

  useEffect(() => {
    if(automation){
      setFormValues({
        name: automation.name,
        group: automation.group,
        taskId: automation.taskId,
        hostId: automation.hostId,
        priority: automation.priority,
        enabled: automation.isEnabled
      });

      setTrigger({
        triggerCondition: automation.triggerCondition.conditional,
        triggerId: '', 
        type: '', 
        enabled: automation.isEnabled 
      });

      setInputTriggers(automation.triggerCondition);
    }
  }, [automation]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleChangeTrigger = (event) => {
    setTrigger({
      ...trigger,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleAddTrigger = () => {
    const triggerParam = triggerParameters[trigger.type]
    const newTrigger = {
      id: trigger.triggerId,
      description: triggerParam.description,
      isEnabled: trigger.enabled,
      isMet: true,
      type: trigger.type,
      startTimeUtc: triggerParam.startTimeUtc,
      interval: triggerParam.interval
    };

    setInputTriggers(prevState => ({
      ...prevState,
      triggers: [...prevState.triggers, newTrigger],
      isMet: true,
      conditional: trigger.triggerCondition
    }));
  }

  const handleRemoveTrigger = (triggerId) => {
    setInputTriggers(prevState => {
      const updatedTriggers = prevState.triggers.filter(trigger => trigger.id !== triggerId);
  
      return {
        ...prevState,
        triggers: updatedTriggers
      };
    });
  };

  const handleClose = () => {
    setTrigger({
      triggerCondition: '',
      triggerId: '',
      type: '',
      enabled: false
    })
    setFormValues({
      name: '',
      group: '',
      taskId: '',
      hostId: '',
      priority: 0,
      enabled: false,
    })
    setTriggerParameters({})
    setInputTriggers({
    triggers: [],
    isMet: false,
    conditional: ''
  })
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <DialogTitle style={{ padding: '5px' }}>
          <Typography variant='body1' align='left'>Add New Automation</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box style={{ padding: '15px 0' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  name='name'
                  label='Name'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='group'
                  label='Group'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.group}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='taskId'
                  label='Task Id'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.taskId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='hostId'
                  label='Host Id'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.hostId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='priority'
                  label='Priority'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.priority}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.enabled}
                      onChange={handleChange}
                      name='enabled'
                      color='primary'
                    />
                  }
                  labelPlacement="start" // Meletakkan label di sebelah kiri switch
                  label='Enabled'
                />
              </Grid>
            </Grid>
            <Accordion style={{ marginTop: '25px' }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body1" align="left">Trigger</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name='triggerCondition'
                      label='Trigger Condition'
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={trigger.triggerCondition}
                      onChange={handleChangeTrigger}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={2} mb={2}>
                      <Typography variant="subtitle1" align="left">Add New Trigger</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid lightgrey', padding: '15px', borderRadius: '10px' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body1" style={{ marginRight: '10px', width: '10%' }}>
                              Id
                            </Typography>
                            <TextField
                              name='triggerId'
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={trigger.triggerId}
                              onChange={handleChangeTrigger}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={trigger.enabled}
                                onChange={handleChangeTrigger}
                                name='enabled'
                                color='primary'
                              />
                            }
                            label={<Typography variant="body1">Enabled</Typography>}
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body1" style={{ marginRight: '10px', width: '10%' }}>
                              Type
                            </Typography>
                            <Select
                              name='type'
                              variant="outlined"
                              fullWidth
                              className={classes.select}
                              value={trigger.type}
                              onChange={handleChangeTrigger}
                            >
                              <MenuItem value='scheduledTrigger'>Scheduled Trigger</MenuItem>
                            </Select>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <TriggerParameterForm
                          triggerType={trigger.type}
                          setTriggerValues={setTriggerParameters}
                          triggerValues={triggerParameters}
                        />
                      </Grid>
                      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <Button
                          variant='outlined'
                          style={{ marginLeft: 'auto' }}
                          onClick={handleAddTrigger}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Box>
                    <Box sx={{
                      border: '1px solid lightgrey',
                      padding: '15px',
                      borderRadius: '10px',
                      marginTop: '20px'
                    }}>
                      <TriggerList triggerList={inputTriggers.triggers ?? []} handleDelete={handleRemoveTrigger} />
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Close</Button>
          <Button onClick={() => alert('submit')} variant='contained' color="primary">Create</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}

const TriggerParameterForm: React.FC<ITriggerParameter> = ({ triggerType, triggerValues, setTriggerValues }) => {
  const handleChangeText = (event) => {
    setTriggerValues({
      ...triggerValues,
      [triggerType]: {
        ...triggerValues[triggerType],
        description: event.target.value
      },
    });
  };

  const handleChangeInterval = (event) => {
    setTriggerValues({
      ...triggerValues,
      [triggerType]: {
        ...triggerValues[triggerType],
        interval: event.target.value
      },
    });
  };

  const handleChangeDate = (value) => {
    setTriggerValues({
      ...triggerValues,
      [triggerType]: {
        ...triggerValues[triggerType],
        startTimeUtc: value
      },
    });
  };

  switch (triggerType) {
    case 'scheduledTrigger':
      return (
        <Box sx={{ border: '1px solid lightgrey', padding: '15px', borderRadius: '10px', marginTop: '20px' }}>
          <Typography style={{ marginBottom: '20px' }}>Trigger Parameter</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name='description'
                label='Description'
                variant="outlined"
                multiline
                maxRows={4}
                size="small"
                fullWidth
                value={triggerValues[triggerType]?.description || ''}
                onChange={handleChangeText}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name='interval'
                label='Interval'
                variant="outlined"
                size="small"
                fullWidth
                value={triggerValues[triggerType]?.interval || ''}
                onChange={handleChangeInterval}
              />
            </Grid>
            <Grid item xs={6}>
              <DateInput
                label="Start Date Time"
                dateFormat={'yyyy-MM-dd'}
                timeZone={'Australia/Brisbane'}
                defaultDate={triggerValues[triggerType]?.startTimeUtc || new Date().toISOString()}
                dateSelected={handleChangeDate}
              />
            </Grid>
          </Grid>
        </Box>
      )
    default:
      return null;
  }
}



export default FormAutomationDialog