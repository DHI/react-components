import React from 'react';
import { Login } from '..';
import { Token, User } from './types';

export default {
  title: 'Auth',
  component: [Login],
};

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
          rememberMeLabelText: 'Remember me',
          resetPasswordLabelText: 'FORGOT PASSWORD?',
          resetPasswordButtonText: 'FORGOT PASSWORD',
          resetPasswordUserNamePlaceholder: 'E-Mail Address or User ID',
          loginButtonText: 'Login',
        }}
        showRememberMe={true}
        showResetPassword={true}
        onSuccess={(user, token) => {
          setState({ user, token });
        }}
        textFieldVariant={'outlined'}
      />
      {state.token && <pre style={{ padding: '2em' }}>{JSON.stringify(state, null, 2)}</pre>}
    </>
  );
};
