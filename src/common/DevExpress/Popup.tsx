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
}) => {
  const [error, setError] = useState<boolean>(false);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('red');
  const [passwordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      updatePasswordStrengthIndicator(value as string);
      setPassword(value);
    } else {
      setRepeatPassword(value);
    }

    onChange(e);
  };

  useEffect(() => {
    if (password !== repeatPassword && repeatPassword.length > 0) {
      setPasswordValid(false);
      setError(true);
    } else {
      setPasswordValid(true);
      setError(false);
    }

    console.log('password: ', password);
    console.log('repeatPassword: ', repeatPassword);
  }, [password, repeatPassword]);

  return (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title || ''}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              {isNew ? (
                <TextField margin="normal" name="id" label="ID" value={row.id || ''} onChange={onChange} />
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
                    value={row.password}
                    error={!passwordValid}
                    InputProps={{ endAdornment }}
                    onChange={(e) => handlePasswordChange(e)}
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
                    value={row.repeatPassword}
                    error={!passwordValid}
                    onChange={handlePasswordChange}
                    helperText={!passwordValid && 'Passwords do not match'}
                    autoComplete="new-password"
                  />
                </>
              )}

              {defaultColumns.map((column, i) => {
                if (column.name === 'userGroups' || column.name === 'users') {
                  return (
                    <Autocomplete
                      key={i}
                      id={column.name}
                      disabled={!users}
                      placeholder={!users ? `Loading ${column.name}...` : `Select ${column.name}(s)`}
                      options={users?.sort() || []}
                      value={row[column.name] || []}
                      onChange={(e, values) => onListChange(column.name, values)}
                      multiple
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          name={column.name}
                          variant="standard"
                          label={`${column.name}(s)`}
                          placeholder="Select"
                          autoComplete="off"
                        />
                      )}
                    />
                  );
                } else {
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
                }
              })}

              {/* {row.users && (
                <Autocomplete
                  id="users"
                  disabled={!users}
                  placeholder={!users ? 'Loading users...' : 'Select user(s)'}
                  options={users?.sort() || []}
                  value={row.users || []}
                  onChange={(e, values) => onListChange('users', values)}
                  multiple
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      name="users"
                      variant="standard"
                      label="User(s)"
                      placeholder="Select"
                      autoComplete="off"
                    />
                  )}
                />
              )} */}
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
