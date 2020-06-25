import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, TextField, DialogTitle, DialogContent, DialogActions, InputAdornment } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { passwordStrength } from '../../Utils/Utils';

class CreateOrEditUserModel extends Component {
  static propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    editing: PropTypes.bool,
  };

  state = {
    form: {
      id: '',
      name: '',
      roles: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    passwordValid: true,
    passwordStrengthColor: 'red',
  };

  componentDidUpdate(prevProps: any) {
    const { user } = this.props as any;

    console.log(prevProps, user);

    if (prevProps.user === user) {
      return;
    }

    // TODO: refactor - if state.user <==> props.user, use getDerivedStateFromProps:
    // NOTE: it is an anti pattern that state depends on props that change over time!!

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ form: user });
  }

  updatePaswordStrengthIndicator = (password: string) => {
    let passwordStrengthColor = 'red';

    switch (passwordStrength(password)) {
      case 0:
        passwordStrengthColor = 'red';
        break;
      case 1:
        passwordStrengthColor = 'yellow';
        break;
      case 2:
        passwordStrengthColor = 'orange';
        break;
      case 3:
        passwordStrengthColor = 'green';
        break;
      default:
        passwordStrengthColor = '';
    }

    this.setState({ passwordStrengthColor });
  };

  handleChange = (param: string) => (e: any) => {
    const { form } = this.state;

    if (param === 'password') {
      this.updatePaswordStrengthIndicator(e.target.value);
    }

    this.setState({
      form: {
        ...form,
        [param]: e.target.value.trim(),
      },
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    const { form } = this.state;
    const { onSubmit } = this.props as any;

    if (form.password !== form.repeatPassword) {
      this.setState({ passwordValid: false });

      return;
    }

    const user = {
      id: form.id,
      name: form.name,
      roles: form.roles || '',
      email: form.email || '',
      password: form.password,
      repeatPassword: form.repeatPassword,
    };

    onSubmit(user);
  };

  render() {
    const { onToggle, open, editing } = this.props as any;
    const { form, passwordValid, passwordStrengthColor } = this.state;

    const endAdornment = (
      <InputAdornment position="end">
        <FiberManualRecord style={{ color: passwordStrengthColor }} />
      </InputAdornment>
    );

    const content = (
      <DialogContent>
        <TextField required fullWidth autoFocus margin="dense" label="User name" variant="outlined" value={form.id} onChange={this.handleChange('id')} />
        <TextField
          fullWidth
          margin="dense"
          type="password"
          label="Password"
          variant="outlined"
          required={!editing}
          value={form.password}
          error={!passwordValid}
          InputProps={{ endAdornment }}
          onChange={this.handleChange('password')}
        />
        <TextField
          fullWidth
          margin="dense"
          type="password"
          variant="outlined"
          required={!editing}
          label="Repeat Password"
          value={form.repeatPassword}
          error={!passwordValid}
          onChange={this.handleChange('repeatPassword')}
          helperText={!passwordValid && 'Passwords do not match'}
        />
        <TextField required fullWidth label="Name" margin="dense" variant="outlined" value={form.name} onChange={this.handleChange('name')} />
        <TextField fullWidth label="Email" margin="dense" variant="outlined" value={form.email} onChange={this.handleChange('email')} />
        <TextField required fullWidth type="text" label="Roles" margin="dense" variant="outlined" value={form.roles} onChange={this.handleChange('roles')} />
      </DialogContent>
    );

    const actions = (
      <DialogActions>
        <Button variant="outlined" onClick={onToggle(null, false)}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {editing ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    );

    return (
      <Dialog open={open}>
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">{editing ? 'Edit Account Details' : 'Create New Account'}</DialogTitle>
          {content}
          {actions}
        </form>
      </Dialog>
    );
  }
}

export default CreateOrEditUserModel;
