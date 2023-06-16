import React from "react";
import { DynamicField } from './triggerParameterForm';
import { Box, Button, FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';

export default function FormInputAutomation({
    classes,
    formErrors,
    formValues,
    handleChange,
    parameters,
    handleAddField,
    handleUpdateField,
    handleRemoveField,
}) {
    return (
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
                    <Button onClick={handleAddField} variant='outlined' className={classes.buttonParam}>Add Task Parameters</Button>
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
    );
}
