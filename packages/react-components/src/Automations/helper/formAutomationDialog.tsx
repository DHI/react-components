import React, { useCallback, useEffect, useState } from 'react'
import { AutomationData, IFormAutomationDialog, IParameters } from '../type';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { ITriggerCondition } from '../type'
import { FormAutomationStyles } from '../styles';
import { createNewAutomation, updateAutomation } from '../../api/Automations/AutomationApi';
import { initialTrigger, fields, initialFormValues, triggerFields, initialFormErrors, initialTriggerError } from './const';
import FormInputTrigger from './formInputTrigger'
import FormInputAutomation from './formInputAutomation'
import { useForm } from './helper';
import { ArrowBack } from '@material-ui/icons';

const FormAutomationDialog: React.FC<IFormAutomationDialog> = ({
  open, onClose, automation, dataSources, fetchData, disabledTextField, listAutomation
}) => {
  const classes = FormAutomationStyles();
  const [addMode, setAddMode] = useState(true)
  const [tabValue, setTabValue] = useState(0);
  const [triggerParameters, setTriggerParameters] = useState({});
  const [inputTriggers, setInputTriggers] = useState<ITriggerCondition>({
    triggers: [],
    conditional: ''
  })
  const [parameters, setParameters] = useState<IParameters[]>([]);
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');

  const form = useForm(initialFormValues, initialFormErrors);
  const triggerForm = useForm(initialTrigger, initialTriggerError);

  useEffect(() => {
    if (automation && open) {
      setAddMode(false)
      form.setValues({
        name: automation.name,
        group: automation.group,
        taskId: automation.taskId,
        hostGroup: automation.hostGroup,
        priority: automation.priority,
        tag: automation.tag,
        isEnabled: automation.isEnabled
      });

      setParameters(Object.entries(automation.taskParameters || {}).map(([key, value]) => ({ key, value })));

      triggerForm.setValues({
        triggerCondition: automation.triggerCondition.conditional,
        triggerId: '',
        type: '',
        isEnabled: automation.isEnabled
      });

      setInputTriggers(automation.triggerCondition);
    }
  }, [automation]);

  const handleChangeClone = (event) => {
    const automationId = event.target.value;
    const findId = listAutomation.find((item) => item.id === automationId)
    if (findId) {
      setSelectedOption(automationId)
      form.setValues({
        taskId: findId.taskId,
        hostGroup: findId.hostGroup,
        priority: findId.priority,
        tag: findId.tag,
        isEnabled: findId.isEnabled
      });

      setParameters(Object.entries(findId.taskParameters || {}).map(([key, value]) => ({ key, value })));

      triggerForm.setValues({
        triggerCondition: findId.triggerCondition.conditional,
        triggerId: '',
        type: '',
        isEnabled: findId.isEnabled
      });

      setInputTriggers(findId.triggerCondition);
    }
  }

  const handleAddTrigger = useCallback(() => {
    const triggerParam = triggerParameters[triggerForm.values.type]
    const newTrigger = {
      id: triggerForm.values.triggerId,
      description: triggerParam.description,
      isEnabled: triggerForm.values.isEnabled,
      type: triggerForm.values.type,
      startTimeUtc: triggerParam.startTimeUtc,
      interval: triggerParam.interval
    };

    setInputTriggers(prevState => ({
      ...prevState,
      triggers: [...prevState.triggers, newTrigger],
      conditional: triggerForm.values.triggerCondition
    }));
  }, [triggerForm.values, triggerParameters]);

  const handleChangeTab = useCallback((event, newValue) => {
    setTabValue(newValue)
  }, [tabValue])

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
    form.setValues(initialFormValues);
    triggerForm.setValues(initialTrigger);
    setParameters([])
    setTriggerParameters({});
    setInputTriggers({
      triggers: [],
      isMet: false,
      conditional: ''
    });
    setAddMode(true);
    setSelectedOption('')
    onClose();
  }, [initialFormValues, initialTrigger, onClose]);

  const handleSubmitData = () => {
    let hasError = false;

    const newFormErrors = { ...form.errors };
    fields.forEach((field) => {
      if (!form.values[field]) {
        newFormErrors[`${field}Error`] = true;
        hasError = true;
      }
    });

    const newTriggerErrors = { ...triggerForm.errors };
    triggerFields.forEach((field) => {
      if (!triggerForm.values[field]) {
        newTriggerErrors[`${field}Error`] = true;
        hasError = true;
      }
    });

    form.setErrors(newFormErrors);
    triggerForm.setErrors(newTriggerErrors);

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
      conditional: triggerForm.values.triggerCondition,
      isEnable: triggerForm.values.isEnabled
    }
    const automationData: AutomationData = {
      ...form.values,
      fullName: `${form.values.group}/${form.values.name}`,
      id: `${form.values.group}/${form.values.name}`,
      triggerCondition: paramTriggerCondition,
      taskParameters: paramPayload,
      parameters: {
        utcNow: new Date().toLocaleString().slice(0, 19).replace('T', ' ')
      }
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
          setLoading(false);
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
          console.log('Error updating automation:', err);
          setLoading(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} maxWidth='md'>
      <Paper elevation={3} className={classes.paperStyle} >
        <DialogTitle className={classes.dialogTitle}>
          <Box className={classes.boxTitleWrapper}>
            <Box className={classes.boxIconWrapper}>
              <IconButton onClick={handleClose}>
                <ArrowBack />
              </IconButton>
              <Typography variant='body1' align='left'>
                {!addMode ? 'Update Automation' : 'Add New Automation'}
              </Typography>
            </Box>
            <Box>
              <Button
                onClick={handleSubmitData}
                disabled={loading || inputTriggers.triggers.length === 0}
                variant='contained'
                color="primary"
              >
                {loading ? <CircularProgress size={24} /> :
                  !addMode ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {addMode && (
            <Box style={{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              right: '35px',
              zIndex: 10
            }}>
              <InputLabel id="dropdown-label" style={{ marginRight: '10px' }}>Clone an Automation</InputLabel>
              <Select
                labelId="dropdown-label"
                displayEmpty
                inputProps={{ 'aria-label': 'Select Automation' }}
                value={selectedOption}
                onChange={handleChangeClone}
              >
                {listAutomation?.map((item) => (
                  <MenuItem value={item.id}>
                    {item.fullName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
          <Box className={classes.boxTab}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
            >
              <Tab label="Automation" />
              <Tab label="Trigger" />
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <FormInputAutomation
              addMode={addMode}
              classes={classes}
              formErrors={form.errors}
              formValues={form.values}
              handleChange={form.handleChange}
              parameters={parameters}
              handleAddField={handleAddField}
              handleUpdateField={handleUpdateField}
              handleRemoveField={handleRemoveField}
              disabledTextField={disabledTextField}
            />
          )}
          {tabValue === 1 && (
            <FormInputTrigger
              classes={classes}
              triggerErrors={triggerForm.errors}
              inputTriggers={inputTriggers}
              trigger={triggerForm.values}
              triggerParameters={triggerParameters}
              handleChangeTrigger={triggerForm.handleChange}
              setTriggerParameters={setTriggerParameters}
              handleAddTrigger={handleAddTrigger}
              handleRemoveTrigger={handleRemoveTrigger}
            />
          )}
        </DialogContent>
      </Paper>
    </Dialog>
  )
}

export default FormAutomationDialog