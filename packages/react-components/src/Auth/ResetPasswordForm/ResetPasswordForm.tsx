import { Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AuthService from '../AuthService';
import ResetPasswordFormProps from './types';
import useStyles from './useStyles';

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const {
    host,
    mailTemplate,
    onResetPassword,
    onBackToLogin,
    resetPasswordUserNamePlaceholder = 'E-mail Address',
    resetPasswordButtonText = 'Reset Password',
    resetPasswordErrorText = 'Email address not found in the system',
    textFieldVariant,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    EmailAddress: '',
  });
  const classes = useStyles();
  const auth = new AuthService(host);
  const validate = () => form.EmailAddress;
  const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
    }

    setLoading(false);

    auth.requestResetPassword(
      mailTemplate,
      form.EmailAddress,
      () => {
        setLoading(false);

        if (onResetPassword) onResetPassword();
      },
      (err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        margin="dense"
        value={form.EmailAddress}
        error={error}
        onChange={(e) => handleChange('EmailAddress', e.target.value)}
        helperText={error ? resetPasswordErrorText : ''}
        label={resetPasswordUserNamePlaceholder}
        variant={textFieldVariant as any}
      />

      <div className={classes.divStyle}>
        <Button className={classes.backButton} onClick={onBackToLogin ? () => onBackToLogin(false) : undefined}>
          <Typography className={classes.labels}>Back</Typography>
        </Button>
        <Button type="submit" color="primary" variant="contained">
          {loading ? <CircularProgress color="inherit" size={24} /> : resetPasswordButtonText}
        </Button>
      </div>
    </form>
  );
};

export { ResetPasswordFormProps, ResetPasswordForm };
