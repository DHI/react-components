import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  Grid,
  TextField,
  withStyles
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
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
  metadata,
}) => {
  const [error, setError] = useState<boolean>(false);

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

              <TextField margin="normal" name="name" label="Name" value={row.name || ''} onChange={onChange} />
              <Autocomplete
                id="users"
                disabled={!users}
                placeholder={!users ? 'Loading users...' : 'Select user(s)'}
                options={users.sort() || []}
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
            </FormGroup>
          </Grid>
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
