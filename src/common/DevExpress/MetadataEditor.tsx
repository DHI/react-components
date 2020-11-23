import { Box, Button, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useRef, useState } from 'react';

export interface MetadataEditorProps {
  metadata: any;
  row: any;
  onChange: any;
  onListChange: any
}

const MetadataEditor: React.FC<MetadataEditorProps> = ({ metadata, row, onChange, onListChange }) => {

  const [list, setList] = useState([]);
  const [multiText, setMultiText] = useState('');
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

  return metadata && metadata.map((item, i) => {
    const { type, label, key } = item;

    if (type === 'Text' && row.metadata) {
      return (
        <TextField
          key={i}
          margin="normal"
          name={key}
          label={label}
          defaultValue={item.default || ''}
          value={row.metadata[key] || ''}
          onChange={onChange}
        />
      );
    } else if (type === 'SingleChoice' && row.metadata) {
      return (
        <FormControl key={i}>
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            defaultValue={item?.default}
            value={row.metadata[key]}
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
        </FormControl>
      );
    } else if (type === 'Boolean' && row.metadata) {
      return (
        <FormControlLabel
          key={i}
          control={
            <Switch
              color="primary"
              checked={row && row.metadata[key] !== undefined ? row.metadata[key] : item.default}
              onChange={onChange}
              name={key}
              inputProps={{ 'aria-label': label }}
            />
          }
          label={label}
        />
      );
    } else if (type === 'MultiChoice' && row.metadata) {
      return (
        <Autocomplete
          key={i}
          placeholder={`Select ${label}`}
          options={item.options}
          defaultValue={item?.default}
          value={row.metadata[key]}
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
    } else if (type === 'MultiText' && row.metadata) {
      return (
        <>
          {row.metadata[key]?.length > 0 && <Typography>{label} list</Typography>}
          {row.metadata[key]?.map((item, i) => (
            <Box alignItems="center" key={i}>
              <Chip
                // className={classes.chip}
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
            value={multiText}
            onChange={(e) => setMultiText(e.target.value)}
            // error={error[key]}
            // helperText={error[key] && regExError}
            InputProps={{
              endAdornment: (
                <Button color="primary" onClick={() => handleMultiText(key)}>
                  Add
                </Button>
              ),
            }}
          />
        </>
      );
    } else {
      return ''
    }


  })

}

export default MetadataEditor;