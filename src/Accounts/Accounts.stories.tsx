import * as React from 'react';
import { LoginGate } from '../Auth/LoginGate';
import Accounts from './Accounts';

export default {
  title: 'Accounts',
  component: [Accounts],
};

const host = process.env.ENDPOINT_URL;

export const AccountsStory = () => {
  return (
    <LoginGate host={host} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token }) => <Accounts host={host} token={token.accessToken.token} />}
    </LoginGate>
  );
};
