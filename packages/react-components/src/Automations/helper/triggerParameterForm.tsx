import { Box, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { FormAutomationStyles, CustomField } from "../styles";
import { DynamicFieldProps, ITriggerParameter } from "../type";
import * as React from 'react';
import DateInput from "../../common/DateInput/DateInput";
import { DeleteOutline } from "@material-ui/icons";
import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';
import { useErrorContext } from '../store'

const CustomDateTime = (props) => {
  const { label, onChange, value } = props;
  const classes = CustomField();

  React.useEffect(() => {
    if (!value) {
      onChange(new Date().toISOString()); 
    }
  }, [])

  return (
    <Grid xs={6} className={classes.dateTime}>
      <DateInput
        label={label}
        withTime={true}
        dateFormat={'yyyy-MM-dd HH:mm:ss'}
        timeZone={'Australia/Brisbane'}
        defaultDate={value || new Date().toISOString()}
        dateSelected={onChange}
        isUtcTime
      />
    </Grid>
  );
}

export const DynamicField: React.FC<DynamicFieldProps> = ({ index, parameter, updateField, removeField }) => {
  const handleChangeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(index, event.target.value, parameter.value);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(index, parameter.key, event.target.value);
  };

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Key"
            variant="outlined"
            size="small"
            fullWidth
            value={parameter.key}
            onChange={handleChangeKey}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Value"
            variant="outlined"
            size="small"
            fullWidth
            value={parameter.value}
            onChange={handleChangeValue}
          />
        </Grid>
      </Grid>
      <Box ml="auto">
        <IconButton onClick={() => removeField(index)}>
          <DeleteOutline />
        </IconButton>
      </Box>
    </Box>
  );
};

const CustomTextField = (props) => {
  const { id, label, required, onChange, value, schema } = props;
  const classes = CustomField();
  const description = schema.description || '';
  const { errors, setErrors } = useErrorContext()

  const handleChange = (event) => {
    const newValue = event.target.value;
    const isValid = (value) => {
      if (!required) return true;
      return value != null && value !== '';
    };

    if (isValid(newValue)) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
      onChange(newValue);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: 'Field is required.' }));
      onChange('');
    }
  }

  return (
    <Grid xs={6}>
      <TextField
        id={id}
        label={label}
        required={required}
        error={!!errors[id]}
        helperText={errors[id] ?? description}
        onChange={handleChange}
        value={value}
        variant="outlined"
        size="small"
        className={classes.textField}
        fullWidth
      />
    </Grid>
  );
};

export const TriggerParameterForm: React.FC<ITriggerParameter> = ({
  triggerType, triggerValues, schema, uiSchema, setTriggerValues }) => {
  const classes = FormAutomationStyles()
  const widget = {
    TextWidget: CustomTextField,
    DateTimeWidget: CustomDateTime,
  };

  const handleChange = React.useCallback((event) => {
    setTriggerValues({
      ...triggerValues,
      [triggerType]: {
        ...triggerValues[triggerType],
        ...event.formData
      },
    });
  }, [setTriggerValues, triggerValues, triggerType]);

  switch (triggerType) {
    case 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs':
      return (
        <Box className={classes.boxParameter}>
          <Typography className={classes.typographyScheduledTrigger}>Trigger Parameter</Typography>
          <Grid container>
            <Form
              className={classes.form}
              widgets={widget}
              formData={triggerValues[triggerType]}
              onChange={handleChange}
              validator={validator}
              uiSchema={uiSchema}
              schema={schema}
            />
          </Grid>
        </Box>
      )
    default:
      return null;
  }
}
