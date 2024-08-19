import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  Grid,
  InputAdornment,
  TextField,
  withStyles,
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { passwordStrength } from '../../utils/Utils';
import MetadataEditor from './MetadataEditor';
import { PopupProps } from './types';

const NoBorderTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      'color': 'rgba(0, 0, 0, 0.87); !important',
      '& fieldset': {
        border: 'none',
      },
    },
  },
})(TextField);

const Popup: React.FC<PopupProps> = ({
  row,
  rows,
  onChange,
  onListChange,
  onMetadataChange,
  onApplyChanges,
  onCancelChanges,
  open,
  title,
  users,
  isNew,
  defaultColumns,
  metadata,
  hasPassword,
  userGroupsDefaultSelected,
  errorMessage,
  passwordRequired,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('red');
  const [passwordValid, setPasswordValid] = useState(true);
  const [duplicatedId, setDuplicatedId] = useState(false);

  const endAdornment = (
    <InputAdornment position="end">
      <FiberManualRecord style={{ color: passwordStrengthColor }} />
    </InputAdornment>
  );

  const updatePasswordStrengthIndicator = (password: string) => {
    let strengthColor = 'red';

    switch (passwordStrength(password)) {
      case 0:
        strengthColor = 'red';
        break;
      case 1:
        strengthColor = 'yellow';
        break;
      case 2:
        strengthColor = 'orange';
        break;
      case 3:
      case 4:
        strengthColor = 'green';
        break;
      default:
        strengthColor = '';
    }

    setPasswordStrengthColor(strengthColor);
  };

  useEffect(() => {
    if (row.password !== row.repeatPassword) {
      setPasswordValid(false);
      setError(true);
    } else {
      setPasswordValid(true);
      setError(false);
    }
  }, [row.password, row.repeatPassword]);

  useEffect(() => {
    updatePasswordStrengthIndicator(row.password as string);
  }, [row.password]);

  const handleOnChange = (e) => {
    const found = rows.some((item) => item.id === e.target.value);
    setDuplicatedId(found);
    setError(found);

    onChange(e);
  };

  return (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title || ''}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              {isNew ? (
                <TextField
                  margin="normal"
                  name="id"
                  label="ID"
                  value={row.id || ''}
                  onChange={handleOnChange}
                  error={duplicatedId}
                  helperText={duplicatedId && 'Duplicated ID'}
                />
              ) : (
                <NoBorderTextField
                  fullWidth
                  label="ID"
                  margin="dense"
                  variant="standard"
                  value={row?.id}
                  disabled={true}
                />
              )}

              {hasPassword && (
                <>
                  <TextField
                    fullWidth
                    name="password"
                    margin="dense"
                    type="password"
                    label="Password"
                    variant="standard"
                    required={isNew}
                    value={row.password || ''}
                    error={!passwordValid || passwordRequired}
                    helperText={passwordRequired ? errorMessage : ''}
                    InputProps={{ endAdornment }}
                    onChange={onChange}
                    autoComplete="new-password"
                  />
                  {/* Must be 'new-password' to avoid autoComplete. https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Browser_compatibility */}
                  <TextField
                    fullWidth
                    name="repeatPassword"
                    margin="dense"
                    type="password"
                    variant="standard"
                    required={isNew}
                    label="Repeat Password"
                    value={row.repeatPassword || ''}
                    error={!passwordValid || passwordRequired}
                    onChange={onChange}
                    helperText={
                      (!passwordValid && 'Passwords do not match') ||
                      (passwordRequired ? errorMessage : '')
                    }                  
                    autoComplete="new-password"
                  />
                </>
              )}

              {defaultColumns.map((column, i) => {
                if (column.name === 'userGroups' || column.name === 'users') {
                  const defaultUsersSelection = [];

                  userGroupsDefaultSelected &&
                    userGroupsDefaultSelected.forEach((userId) => {
                      const found = users.filter((user) => user.id === userId);
                      defaultUsersSelection.push(...found);
                    });

                  const currentValues =
                    row[column.name] != null
                      ? users.filter((f) => row[column.name].includes(f.id) || row[column.name].includes(f.name))
                      : column.name === 'userGroups' && userGroupsDefaultSelected
                      ? defaultUsersSelection
                      : [];

                  return (
                    <Autocomplete
                      key={i}
                      id={column.name}
                      disabled={!users}
                      placeholder={!users ? `Loading ${column.name}...` : `Select ${column.name}(s)`}
                      options={users.sort((a: any, b: any) => a.name - b.name) || []}
                      value={currentValues}
                      getOptionSelected={(option, val) => option.name === val.name}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, values) =>
                        onListChange(
                          column.name,
                          values.map((v: any) => v.id),
                        )
                      }
                      multiple
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          name={column.name}
                          variant="standard"
                          label={`${column.title.slice(0, -1)}(s)`}
                          placeholder="Select"
                          autoComplete="off"
                        />
                      )}
                    />
                  );
                } else {
                  if (column.name !== 'id') {
                    return (
                      <TextField
                        key={i}
                        margin="normal"
                        name={column.name}
                        label={column.title}
                        value={row[column.name] || ''}
                        onChange={onChange}
                      />
                    );
                  } else {
                    return null;
                  }
                }
              })}
            </FormGroup>
          </Grid>
          {metadata && (
            <Grid item xs={12}>
              <FormGroup>
                <MetadataEditor
                  metadata={metadata}
                  row={row}
                  onChange={onMetadataChange}
                  onListChange={onListChange}
                  onError={setError}
                />
              </FormGroup>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: 20 }}>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
        </Button>
        <Button onClick={onApplyChanges} variant="contained" color="primary" disabled={error}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
