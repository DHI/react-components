import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  FormControl: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export default function AccountMetadata({ data, handleChange }) {
  const classes = useStyles();

  return data.map((meta, i) => {
    if (meta.type === 'Text') {
      return (
        <TextField
          key={i}
          fullWidth
          autoFocus
          margin="dense"
          label={meta.label}
          variant="standard"
          value={meta[meta.key]}
          onChange={(e) => handleChange(meta.key, e.target.value)}
        />
      );
    } else if (meta.type === 'SingleChoice') {
      return (
        <FormControl className={classes.FormControl} key={i}>
          <InputLabel>{meta.label}</InputLabel>
          <Select
            fullWidth
            defaultValue={meta.default}
            id={meta.key}
            onChange={(e) => handleChange(meta.key, e.target.value)}
          >
            {meta.options.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if (meta.type === 'Boolean') {
      return (
        <FormControlLabel
          key={i}
          control={
            <Switch
              checked={meta.default}
              onChange={(e) => handleChange(meta.key, e.target.checked)}
              name={meta.label}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label={meta.label}
        />
      );
    } else if (meta.type === 'MultiChoice') {
      return (
        <Autocomplete
          key={i}
          placeholder={`Select ${meta.label}`}
          options={meta.options}
          value={meta[meta.key]}
          //   onChange={(e, values) => handleMultiChoice(meta.key, values)}
          onChange={(e, values) => handleChange(meta.key, values)}
          multiple={true as any}
          renderInput={(props) => (
            <TextField
              {...props}
              name={meta.key}
              variant="standard"
              label={meta.label}
              placeholder="Select"
              autoComplete="off"
            />
          )}
          style={{
            marginTop: 8,
          }}
        />
      );
    }

    return null;
  });
}
