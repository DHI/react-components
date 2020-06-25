import React from 'react';
import { Login } from '..';

export default {
  title: 'Auth',
  component: [Login],
};

export const LoginStory = () => {
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
