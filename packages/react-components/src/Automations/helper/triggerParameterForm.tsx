import { Box, Grid, TextField, Typography } from "@material-ui/core";
import { FormAutomationStyles } from "../styles";
import { ITriggerParameter } from "../type";
import * as React from 'react';
import DateInput from "../../common/DateInput/DateInput";

export const TriggerParameterForm: React.FC<ITriggerParameter> = ({ triggerType, triggerValues, setTriggerValues }) => {
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
      case 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs':
        return (
          <Box className={classes.boxParameter}>
            <Typography className={classes.typographyScheduledTrigger}>Trigger Parameter</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DateInput
                  label="Start Date Time"
                  dateFormat={'yyyy-MM-dd'}
                  timeZone={'Australia/Brisbane'}
                  defaultDate={triggerValues[triggerType]?.startTimeUtc || new Date().toISOString()}
                  dateSelected={handleChangeDate}
                />
              </Grid>
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
            </Grid>
          </Box>
        )
      default:
        return null;
    }
  }