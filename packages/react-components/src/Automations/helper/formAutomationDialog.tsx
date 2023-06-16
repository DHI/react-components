import React, { useCallback, useEffect, useState } from 'react'
import { AutomationData, IFormAutomationDialog, IParameters } from '../type';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import { ITriggerCondition } from '../type'
import { FormAutomationStyles } from '../styles';
import { createNewAutomation, updateAutomation } from '../../api/Automations/AutomationApi';
import { initialTrigger, fields, initialFormValues, triggerFields, initialFormErrors, initialTriggerError } from './const';
import FormInputTrigger from './formInputTrigger'
import FormInputAutomation from './formInputAutomation'
import { useForm } from './helper';

const FormAutomationDialog: React.FC<IFormAutomationDialog> = ({
  open, onClose, automation, dataSources, fetchData
}) => {
  const classes = FormAutomationStyles();
  const [addMode, setAddMode] = useState(true)
  const [triggerParameters, setTriggerParameters] = useState({});
  const [inputTriggers, setInputTriggers] = useState<ITriggerCondition>({
    triggers: [],
    conditional: ''
  })
  const [parameters, setParameters] = useState<IParameters[]>([]);
  const [loading, setLoading] = useState(false)

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
          <Typography variant='body1' align='left'>
            {!addMode ? 'Update Automation' : 'Add New Automation'}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box className={classes.boxDialog}>
            <FormInputAutomation
              classes={classes}
              formErrors={form.errors}
              formValues={form.values}
              handleChange={form.handleChange}
              parameters={parameters}
              handleAddField={handleAddField}
              handleUpdateField={handleUpdateField}
              handleRemoveField={handleRemoveField}
            />

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