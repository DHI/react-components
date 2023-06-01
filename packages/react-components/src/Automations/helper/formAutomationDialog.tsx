import React, { useEffect, useState } from 'react'
import { AutomationData, IFormAutomationDialog, ITriggerParameter } from '../type';
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
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { TriggerList } from './detailAutomationsDialog';
import DateInput from '../../common/DateInput/DateInput';
import { ExpandMore } from '@material-ui/icons';
import { ITriggerCondition } from '../type'
import { FormAutomationStyles } from '../styles';

const FormAutomationDialog: React.FC<IFormAutomationDialog> = ({
  open, onClose, automation
}) => {
  const classes = FormAutomationStyles();
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
    if (automation) {
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
    <Dialog open={open} maxWidth='md'>
      <Paper elevation={3} className={classes.paperStyle} >
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant='body1' align='left'>Add New Automation</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box className={classes.boxDialog}>
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
            <Accordion className={classes.accordion}>
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
                    <Box className={classes.boxAccordion}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.typographyAccordion}>
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
                            <Typography variant="body1" className={classes.typographyAccordion}>
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
                      <Grid item xs={12} className={classes.gridAddButton}>
                        <Button
                          variant='outlined'
                          className={classes.addButton}
                          onClick={handleAddTrigger}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Box>
                    <Box className={classes.boxParameter}>
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
  const classes = FormAutomationStyles()
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
        <Box className={classes.boxParameter}>
          <Typography className={classes.typographyScheduledTrigger}>Trigger Parameter</Typography>
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