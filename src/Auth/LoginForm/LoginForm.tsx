import { Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AuthService from '../AuthService';
import LoginFormProps from './types';
import useStyles from './useStyles';

const LoginForm = (props: LoginFormProps) => {
  const {
    userNamePlaceholder,
    passwordPlaceholder,
    host,
    onSuccess,
    onError,
    showRememberMe,
    onResetPassword,
    showResetPassword,
    rememberMeLabelText = 'Remember me?',
    resetPasswordLabelText = 'Reset password',
    loginButtonText = 'Login',
    textFieldVariant = 'outlined',
  } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    id: '',
    password: '',
    rememberMe: false,
  });
  const classes = useStyles();
  const auth = new AuthService(host);
  const validate = () => form.id && form.password;

  const handleChange = (name: string, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
    }

    auth.login(
      form,
      (user, token) => {
        console.log('login success');
        setLoading(false);

        if (onSuccess != null) {
          onSuccess(user, token);
        }
      },
      (error) => {
        console.log('login error');
        setLoading(false);
        setError(true);

        if (onError != null) {
          onError(error);
        }
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        name="id"
        error={error}
        margin="dense"
        value={form.id}
        onChange={(e) => handleChange('id', e.target.value)}
        helperText={error ? 'Invalid Login' : ''}
        label={userNamePlaceholder}
        variant={textFieldVariant as any}
      />
      <TextField
        required
        fullWidth
        margin="dense"
        type="password"
        onChange={(e) => handleChange('password', e.target.value)}
        label={passwordPlaceholder}
        variant={textFieldVariant as any}
      />
      <div className={classes.rememberMe}>
        {showRememberMe && (
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={form.rememberMe}
                color="primary"
                onChange={(e) => handleChange('rememberMe', e.target.checked)}
              />
            }
            label={<Typography className={classes.labels}>{rememberMeLabelText}</Typography>}
          />
        )}
      </div>
      <div className={classes.submit}>
        {showResetPassword && (
          <Button
            className={classes.rememberMeLink}
            onClick={
              onResetPassword
                ? () => {
                  onResetPassword(true);
                }
                : undefined
            }
          >
            <Typography className={classes.labels}>{resetPasswordLabelText}</Typography>
          </Button>
        )}
        <Button type="submit" color="primary" variant="contained">
          {loading ? <CircularProgress color="inherit" size={24} /> : loginButtonText}
        </Button>
      </div>
    </form>
  );
};

export { LoginFormProps, LoginForm };
