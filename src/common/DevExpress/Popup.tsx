import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import MetadataEditor from './MetadataEditor';

interface PopupProps {
  row: any;
  onChange: any;
  onApplyChanges: any;
  onMetadataChange: any;
  onCancelChanges: any;
  onListChange: any;
  open: boolean,
  title: string;
  users: string[];
  isNew: boolean;
  metadata: any;
}

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
}) => (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title || ''}</DialogTitle>
      <DialogContent>
        <Grid container >
          <Grid item xs={12}>
            <FormGroup>
              {isNew && (
                <TextField
                  margin="normal"
                  name="id"
                  label="ID"
                  value={row.id || ''}
                  onChange={onChange}
                />
              )}
              <TextField
                margin="normal"
                name="name"
                label="Name"
                value={row.name || ''}
                onChange={onChange}
              />
              <Autocomplete
                id='users'
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
              />

            </FormGroup>

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
      </Button>
        <Button onClick={onApplyChanges} color="primary">
          Save
      </Button>
      </DialogActions>
    </Dialog>
  );

export default Popup;