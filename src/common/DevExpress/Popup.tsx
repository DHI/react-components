import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

interface PopupProps {
  row: any;
  onChange: any;
  onApplyChanges: any;
  onCancelChanges: any;
  onListChagne: any;
  open: boolean,
  title: string;
  users: string[];
  isNew: boolean;
}

const Popup: React.FC<PopupProps> = ({
  row,
  onChange,
  onListChagne,
  onApplyChanges,
  onCancelChanges,
  open,
  title,
  users,
  isNew,
}) => (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title || ''}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
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
              {console.log(row)}
              <Autocomplete
                id='users'
                disabled={!users}
                placeholder={!users ? 'Loading users...' : 'Select user(s)'}
                options={users || []}
                value={row.users || []}
                onChange={(e, values) => onListChagne('users', values)}
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
          <Grid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="lastName"
                label="Last Name"
                value={row.lastName || ''}
                onChange={onChange}
              />

              <TextField
                margin="normal"
                name="phone"
                label="Phone"
                value={row.phone || ''}
                onChange={onChange}
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