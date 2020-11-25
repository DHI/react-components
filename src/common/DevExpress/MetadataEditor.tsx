import { Box, Button, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useRef, useState } from 'react';
import { MetadataEditorProps } from './types';

const MetadataEditor = ({ metadata, row, onChange, onListChange }: MetadataEditorProps) => {

  const [list, setList] = useState([]);
  const [multiText, setMultiText] = useState('');
  const [error, setError] = useState({});
  const multiTextField = useRef(null);

  const handleMultiText = (key) => {
    setList([...list, multiText]);
    setMultiText('');
    multiTextField.current.focus();
    onListChange(key, [...list, multiText], true);
  };

  const handleChipDelete = (key, item) => {
    const newList = row.metadata[key].filter((value) => value !== item);
    setList(newList)
    onListChange(key, newList, true);
  };

  const handleChange = (e: any, regex: string) => {
    const re = new RegExp(regex);
    const { value, name } = e.target;

    if (re.test(value)) {
      setError({
        ...error,
        [name]: false,
      });
    } else {
      setError({
        ...error,
        [name]: true,
      });
    }

    onChange(e);
  };

  return (
    <>
      {metadata && metadata.map((item, i) => {
        const { type, label, key } = item;

        if (type === 'Text') {
          return (
            <TextField
              key={i}
              margin="normal"
              name={key}
              label={label}
              value={row.metadata && row.metadata[key] ? row.metadata[key] : item.default}
              error={error[key]}
              helperText={error[key] && item.regExError}
              onChange={(e) => handleChange(e, item.regEx)}
            />
          );
        } else if (type === 'SingleChoice') {

          return (
            <FormControl key={i}>
              <InputLabel>{label}</InputLabel>
              <Select
                fullWidth
                value={row.metadata && row.metadata[key] ? row.metadata[key] : item.default}
                id={key}
                name={key}
                onChange={onChange}
              >
                {item.options.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl >
          );
        } else if (type === 'Boolean') {
          return (
            <FormControlLabel
              style={{ marginTop: 10 }}
              key={i}
              control={
                <Switch
                  color="primary"
                  checked={row.metadata === undefined || row.metadata[key] === undefined ? item.default : row.metadata[key]}
                  onChange={onChange}
                  name={key}
                  inputProps={{ 'aria-label': label }}
                />
              }
              label={label}
            />
          );
        } else if (type === 'MultiChoice') {
          return (
            <Autocomplete
              key={i}
              placeholder={`Select ${label}`}
              options={item.options.sort() || []}
              value={row.metadata && row.metadata[key] ? row.metadata[key] : item.default}
              onChange={(e, values) => onListChange(key, values, true)}
              multiple={true as any}
              renderInput={(props) => (
                <TextField
                  {...props}
                  name={key}
                  variant="standard"
                  label={label}
                  placeholder="Select"
                  autoComplete="off"
                />
              )}
              style={{
                marginTop: 8,
              }}
            />
          );
        } else if (type === 'MultiText') {
          return (
            <>
              {row.metadata && row.metadata[key]?.length > 0 && <Typography style={{ marginTop: 10 }}>{label} list</Typography>}
              {row.metadata && row.metadata[key]?.map((item, i) => (
                <Box alignItems="center" key={`${item}_${i}`}>
                  <Chip
                    key={item}
                    label={item}
                    style={{ marginRight: 4 }}
                    onDelete={() => handleChipDelete(key, item)}
                  />
                </Box>
              ))}

              <TextField
                key={i}
                fullWidth
                margin="dense"
                label={label}
                inputRef={multiTextField}
                variant="standard"
                value={multiText || ''}
                onChange={(e) => setMultiText(e.target.value)}
                error={error[key]}
                helperText={error[key] && item.regExError}
                InputProps={{
                  endAdornment: (
                    <Button color="primary" disabled={multiText === ''} onClick={() => handleMultiText(key)}>
                      Add
                    </Button>
                  ),
                }}
              />
            </>
          );
        }

        return null
      })}
    </>
  )
}

export default MetadataEditor;