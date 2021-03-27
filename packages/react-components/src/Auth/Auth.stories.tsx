import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import { Login } from '..';
import { Token, User } from './types';

export default {
  title: 'Auth',
  component: Login,
} as Meta;

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
          userNamePlaceholder: 'Username',
          passwordPlaceholder: 'Password',
          rememberMeLabel: 'Remember me',
          resetPasswordLabel: 'FORGOT PASSWORD?',
          resetPasswordButton: 'FORGOT PASSWORD',
          resetPasswordUserNamePlaceholder: 'E-Mail Address or User ID',
          loginButton: 'Login',
        }}
        showRememberMe={true}
        showResetPassword={true}
        onSuccess={(user, token) => {
          setState({ user, token });
        }}
        textFieldVariant="outlined"
      />
      {state.token && <pre style={{ padding: '2em' }}>{JSON.stringify(state, null, 2)}</pre>}
    </>
  );
};
