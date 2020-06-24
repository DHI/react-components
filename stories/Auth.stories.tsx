import React from 'react';
import { Login } from '../src';

export default {
  title: 'Auth',
  component: [Login],
};

export const login = () => {
  return (
    <Login
      host={process.env.ENDPOINT_URL}
      userNamePlaceholder={'Username'}
      passwordPlaceholder={'Password'}
      showRememberMe={true}
      rememberMeLabelText={'Remember me'}
      showResetPassword={true}
      resetPasswordLabelText={'FORGOT PASSWORD?'}
      resetPasswordButtonText={'FORGOT PASSWORD'}
      resetPasswordUserNamePlaceholder={'E-Mail Address or User ID'}
      loginButtonText={'Login'}
      textFieldVariant={'outlined'}
    />
  );
};
