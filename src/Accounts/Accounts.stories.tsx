import * as React from 'react';
import { LoginGate } from '../Auth/LoginGate';
import Accounts from './Accounts';

export default {
  title: 'Accounts',
};

const host = process.env.ENDPOINT_URL

export const AccountsList = () => {
  return <LoginGate
    host={host}
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
    textFieldVariant={'outlined'}
  >
    {({ token }) => 
      <Accounts host={host} token={token.accessToken.token} />
    }
  </LoginGate>;
};
