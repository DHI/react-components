import React from "react";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { TriggerParameterForm } from './triggerParameterForm'
import { TriggerList } from './detailAutomationsDialog';

export default function FormInputTrigger({
    classes,
    triggerErrors,
    inputTriggers,
    trigger,
    triggerParameters,
    handleChangeTrigger,
    setTriggerParameters,
    handleAddTrigger,
    handleRemoveTrigger,
}) {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        error={triggerErrors.triggerConditionError}
                        helperText={triggerErrors.triggerConditionError ? "Trigger Condition is required" : "Ex: (trigger1 AND trigger2) OR trigger3"}
                        FormHelperTextProps={{ className: classes.helperText }}
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
                    <Box className={inputTriggers?.triggers?.length > 0 ? classes.boxParameter : classes.boxParameterDisabled}>
                        <TriggerList triggerList={inputTriggers.triggers ?? []} handleDelete={handleRemoveTrigger} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
