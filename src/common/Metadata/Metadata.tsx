import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Box,
  Chip,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { MetadataProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  FormControl: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  switch: {
    marginTop: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const Metadata = ({
  metadata,
  data,
  onChange,
  onError,
}: {
  metadata?: MetadataProps[];
  data;
  onChange(key: string, value: any): void;
  onError(error: boolean): void;
}) => {
  const classes = useStyles();
  const [multiText, setMultiText] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState({});
  const multiTextField = useRef(null);

  const handleMultiText = (key) => {
    setList([...list, multiText]);
    setMultiText('');
    multiTextField.current.focus();
    onChange(key, [...list, multiText]);
  };

  const handleText = (value) => {
    setMultiText(value);
  };

  const handleChipDelete = (key, item) => {
    const newList = list.filter((value) => value !== item);
    onChange(key, newList);
  };

  const handleChange = (key: string, value: any, regex: string) => {
    const re = new RegExp(regex);

    if (re.test(value)) {
      setError({
        ...error,
        [key]: false,
      });
    } else {
      setError({
        ...error,
        [key]: true,
      });
    }

    onChange(key, value);
  };

  useEffect(() => {
    onError(Object.keys(error).some((v) => error[v] === true));
  }, [error]);

  useEffect(() => {
    setList(data.MultiText);
  }, [data.MultiText]);

  return (
    <Fragment>
      {metadata?.map((meta, i) => {
        if (meta.type === 'Text') {
          return (
            <TextField
              key={meta.key + '' + i}
              fullWidth
              margin="dense"
              label={meta.label}
              variant="standard"
              value={data[meta.key]}
              error={error[meta.key]}
              helperText={error[meta.key] && meta.regExError}
              onChange={(e) => handleChange(meta.key, e.target.value, meta.regEx)}
            />
          );
        } else if (meta.type === 'SingleChoice') {
          return (
            <FormControl className={classes.FormControl} key={meta.key + '' + i}>
              <InputLabel>{meta.label}</InputLabel>
              <Select
                fullWidth
                defaultValue={meta?.default}
                value={data[meta.key]}
                id={meta.key}
                onChange={(e) => handleChange(meta.key, e.target.value, meta.regEx)}
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
              key={meta.key + '' + i}
              className={classes.switch}
              control={
                <Switch
                  color="primary"
                  checked={data && data[meta.key] !== undefined ? data[meta.key] : meta?.default}
                  onChange={(e) => handleChange(meta.key, e.target.checked, meta.regEx)}
                  name={meta.label}
                  inputProps={{ 'aria-label': meta.label }}
                />
              }
              label={meta.label}
            />
          );
        } else if (meta.type === 'MultiChoice') {
          return (
            <Autocomplete
              key={meta.key + '' + i}
              placeholder={`Select ${meta.label}`}
              options={meta.options}
              defaultValue={meta?.default}
              value={data[meta.key]}
              onChange={(e, values) => handleChange(meta.key, values, meta.regEx)}
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
        } else if (meta.type === 'MultiText') {
          return (
            <>
              {list.length > 0 && <Typography className={classes.switch}>{meta.label} list</Typography>}
              {list?.map((item, i) => (
                <Box alignItems="center" key={i}>
                  <Chip
                    className={classes.chip}
                    key={item}
                    label={item}
                    style={{ marginRight: 4 }}
                    onDelete={() => handleChipDelete(meta.key, item)}
                  />
                </Box>
              ))}

              <TextField
                key={meta.key + '' + i}
                fullWidth
                margin="dense"
                label={meta.label}
                inputRef={multiTextField}
                variant="standard"
                value={multiText}
                onChange={(e) => handleText(e.target.value)}
                error={error[meta.key]}
                helperText={error[meta.key] && meta.regExError}
                InputProps={{
                  endAdornment: (
                    <Button color="primary" onClick={() => handleMultiText(meta.key)}>
                      Add
                    </Button>
                  ),
                }}
              />
            </>
          );
        }

        return null;
      })}
    </Fragment>
  );
};

export { MetadataProps, Metadata };
