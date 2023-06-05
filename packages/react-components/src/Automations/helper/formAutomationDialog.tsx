import React, { useCallback, useEffect, useState } from 'react'
import { AutomationData, IFormAutomationDialog, IParameters, ITriggerParameter } from '../type';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
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
import { ExpandMore } from '@material-ui/icons';
import { ITriggerCondition } from '../type'
import { FormAutomationStyles } from '../styles';
import { createNewAutomation, updateAutomation } from '../../api/Automations/AutomationApi';
import { initialTrigger, fields, initialFormValues, triggerFields, initialFormErrors, initialTriggerError } from './const';
import { DynamicField, TriggerParameterForm } from './triggerParameterForm';

const FormAutomationDialog: React.FC<IFormAutomationDialog> = ({
  open, onClose, automation, dataSources, fetchData, setLoading, loading
}) => {
  const classes = FormAutomationStyles();
  const [addMode, setAddMode] = useState(true)
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [trigger, setTrigger] = useState(initialTrigger);
  const [triggerErrors, setTriggerErrors] = useState(initialTriggerError)
  const [triggerParameters, setTriggerParameters] = useState({});
  const [inputTriggers, setInputTriggers] = useState<ITriggerCondition>({
    triggers: [],
    isMet: false,
    conditional: ''
  })
  const [parameters, setParameters] = useState<IParameters[]>([]);

  useEffect(() => {
    if (automation && open) {
      setAddMode(false)
      setFormValues({
        name: automation.name,
        group: automation.group,
        taskId: automation.taskId,
        hostGroup: automation.hostGroup,
        priority: automation.priority,
        tag: automation.tag,
        isEnabled: automation.isEnabled
      });

      setParameters(Object.entries(automation.parameters || {}).map(([key, value]) => ({ key, value })));

      setTrigger({
        triggerCondition: automation.triggerCondition.conditional,
        triggerId: '',
        type: '',
        isEnabled: automation.isEnabled
      });

      setInputTriggers(automation.triggerCondition);
    }
  }, [automation]);

  const setError = useCallback((object, name, type, value) => {
    return {
      ...object,
      [name]: type === 'checkbox' ? value : !value,
    };
  }, []);

  const handleChange = useCallback((event) => {
    const { name, type, value, checked } = event.target;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setFormErrors(prevValues => setError(prevValues, `${name}Error`, type, value));
  }, [setError]);

  const handleChangeTrigger = useCallback((event) => {
    const { name, type, value, checked } = event.target;

    setTrigger(prevTrigger => ({
      ...prevTrigger,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setTrigger(prevTrigger => setError(prevTrigger, `${name}Error`, type, value));
  }, [setError]);

  const handleAddTrigger = useCallback(() => {
    const triggerParam = triggerParameters[trigger.type]
    const newTrigger = {
      id: trigger.triggerId,
      description: triggerParam.description,
      isEnabled: trigger.isEnabled,
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
  }, [trigger, triggerParameters]);

  const handleAddField = useCallback(() => {
    setParameters(prevParameters => [...prevParameters, { key: "", value: "" }]);
  }, []);

  const handleUpdateField = useCallback((index: number, key: string, value: string) => {
    setParameters(prevParameters => {
      const newParameters = [...prevParameters];
      newParameters[index] = { key, value };
      return newParameters;
    });
  }, []);

  const handleRemoveField = useCallback((index: number) => {
    setParameters(prevParameters => prevParameters.filter((_, i) => i !== index));
  }, []);

  const handleRemoveTrigger = useCallback((triggerId) => {
    setInputTriggers(prevState => {
      const updatedTriggers = prevState.triggers.filter(trigger => trigger.id !== triggerId);

      return {
        ...prevState,
        triggers: updatedTriggers
      };
    });
  }, []);

  const handleClose = useCallback(() => {
    setFormValues(initialFormValues);
    setTrigger(initialTrigger);
    setFormErrors(initialFormErrors)
    setTriggerErrors(initialTriggerError)
    setParameters([])
    setTriggerParameters({});
    setInputTriggers({
      triggers: [],
      isMet: false,
      conditional: ''
    });
    setAddMode(true);
    onClose();
  }, [initialFormValues, initialTrigger, onClose]);

  const handleSubmitData = () => {
    let hasError = false;

    const newFormValues = { ...formErrors };
    fields.forEach((field) => {
      if (!formValues[field]) {
        newFormValues[`${field}Error`] = true;
        hasError = true;
      }
    });

    const newTrigger = { ...triggerErrors };
    triggerFields.forEach((field) => {
      if (!trigger[field]) {
        newTrigger[`${field}Error`] = true;
        hasError = true;
      }
    });

    setFormErrors(newFormValues);
    setTriggerErrors(newTrigger);

    if (hasError) {
      return; // Stop the function if there are errors
    }

    // Continue with the previous code if there are no errors
    setLoading(true);
    const paramPayload = parameters.reduce((acc, { key, value }) => {
      return {
        ...acc,
        [key]: value,
      };
    }, {});
    const paramTriggerCondition = {
      ...inputTriggers,
      conditional: trigger.triggerCondition,
      isEnable: trigger.isEnabled
    }
    const automationData: AutomationData = {
      ...formValues,
      fullName: `${formValues.group}/${formValues.name}`,
      id: `${formValues.group}/${formValues.name}`,
      updated: new Date().toISOString(),
      triggerCondition: paramTriggerCondition,
      parameters: paramPayload,
    };

    if (addMode) {
      createNewAutomation(dataSources, automationData).subscribe({
        next: async () => {
          try {
            await fetchData(true);
            handleClose();
          } catch (err) {
            console.log(err);
          } finally {
            onClose();
            setLoading(false);
          }
        },
        error: (err) => {
          console.log('Error creating new automation:', err);
        },
      });
    } else {
      const updatedPayload = {
        ...automationData,
        id: automation?.id,
      };
      updateAutomation(dataSources, updatedPayload).subscribe({
        next: async () => {
          try {
            await fetchData(true);
            handleClose();
          } catch (err) {
            console.log(err);
          } finally {
            onClose();
            setLoading(false);
          }
        },
        error: (err) => {
          console.log('Error update automation:', err);
        },
      });
    }
  };

  return (
    <Dialog open={open} maxWidth='md'>
      <Paper elevation={3} className={classes.paperStyle} >
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant='body1' align='left'>
            {!addMode ? 'Update Automation' : 'Add New Automation'}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box className={classes.boxDialog}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  error={formErrors.nameError}
                  helperText={formErrors.nameError ? "Name is required" : ""}
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
                  error={formErrors.groupError}
                  helperText={formErrors.groupError ? "Group is required" : ""}
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
                  error={formErrors.taskIdError}
                  helperText={formErrors.taskIdError ? "Task Id is required" : ""}
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
                  error={formErrors.hostGroupError}
                  helperText={formErrors.hostGroupError ? "Host Group is required" : ""}
                  name='hostGroup'
                  label='Host Group'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.hostGroup}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={formErrors.tagError}
                  helperText={formErrors.tagError ? "Tag is required" : ""}
                  name='tag'
                  label='Tag'
                  variant="outlined"
                  size='small'
                  fullWidth
                  value={formValues.tag}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={formErrors.priorityError}
                  helperText={formErrors.priorityError ? "Priority is required" : ""}
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
                      checked={formValues.isEnabled}
                      onChange={handleChange}
                      name='isEnabled'
                      color='primary'
                    />
                  }
                  labelPlacement="start"
                  label='Enabled'
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Button onClick={handleAddField} variant='outlined' className={classes.buttonParam}>Add New Parameters</Button>
                  {parameters.map((parameter, i) => (
                    <DynamicField
                      key={i}
                      index={i}
                      parameter={parameter}
                      updateField={handleUpdateField}
                      removeField={handleRemoveField}
                    />
                  ))}
                </Box>
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
                      error={triggerErrors.triggerConditionError}
                      helperText={triggerErrors.triggerConditionError ? "Trigger Condition is required" : ""}
                      name='triggerCondition'
                      label='Trigger Condition'
                      variant="outlined"
                      size="small"
                      fullWidth
                      style={{
                        background: inputTriggers.triggers.length === 0 ? '#e0e0e0' : 'inherit',
                      }}
                      disabled={inputTriggers.triggers.length === 0}
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
                              error={triggerErrors.triggerIdError}
                              helperText={triggerErrors.triggerIdError ? "Trigger Id is required" : ""}
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
                                checked={trigger.isEnabled}
                                onChange={handleChangeTrigger}
                                name='isEnabled'
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
                              <MenuItem value='DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs'>Scheduled Trigger</MenuItem>
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
                          disabled={trigger.triggerId === '' || trigger.type === ''}
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
          <Button
            onClick={handleSubmitData}
            disabled={loading || inputTriggers.triggers.length === 0}
            variant='contained'
            color="primary"
          >
            {loading ? <CircularProgress size={24} /> :
              !addMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}

export default FormAutomationDialog