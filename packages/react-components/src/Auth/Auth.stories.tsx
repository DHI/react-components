import { Typography } from '@material-ui/core';
import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import { Login } from '..';
import { Token, User } from './types';

export const LoginStory = () => {
  const [state, setState] = React.useState<{
    user?: User;
    token?: Token;
  }>({});

  return (
    <>
      <Login
        host={process.env.ENDPOINT_URL}
        translations={{
          loginButton: 'Login',
          userNamePlaceholder: 'Username',
          passwordPlaceholder: 'Password',
          rememberMeLabel: 'Remember me?',
          resetPasswordLabel: 'Forgot Password',
          resetPasswordButton: 'Forgot Password',
          updatePasswordEmailPlaceholder: 'Email Address',
          updatePasswordNewPasswordPlaceholder: 'New Password',
          updatePasswordConfirmPasswordPlaceholder: 'Confirm Password',
        }}
        showRememberMe={true}
        showResetPassword={true}
        resetPasswordMailTemplate={'Template1'}
        onSuccess={(user, token) => {
          setState({ user, token });
        }}
        textFieldVariant="outlined"
      />
    </>
  );
};

export const UpdatePasswordStory = () => {
  return (
    <>
      <Login
        host={process.env.ENDPOINT_URL}
        translations={{
          loginButton: 'Login',
          userNamePlaceholder: 'Username',
          passwordPlaceholder: 'Password',
          rememberMeLabel: 'Remember me?',
          resetPasswordLabel: 'Forgot Password',
          resetPasswordButton: 'Forgot Password',
          updatePasswordEmailPlaceholder: 'Email Address',
          updatePasswordNewPasswordPlaceholder: 'New Password',
          updatePasswordConfirmPasswordPlaceholder: 'Confirm Password',
        }}
        showUpdatePassword={true}
        textFieldVariant="outlined"
      />
    </>
  );
};

export default {
  title: 'Auth',
  component: Login,
  subcomponents: { UpdatePasswordStory },
} as Meta;
