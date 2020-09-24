import * as React from 'react';
import { LoginGate } from '../Auth/LoginGate';
import Accounts from './Accounts';

export default {
  title: 'Accounts',
  component: [Accounts],
};

const host = process.env.ENDPOINT_URL;

export const AccountsStory = () => {
  const metadataAccounts = [
    {
      key: 'myChoice',
      label: 'My Choice',
      type: 'SingleChoice',
      options: ['A', 'B', 'C'],
      default: 'B',
    },
    {
      key: 'myBoolean',
      label: 'My Boolean',
      type: 'Boolean',
      default: true,
    },
    {
      key: 'myText',
      label: 'My Text',
      type: 'Text',
      default: 'description',
    },
    {
      key: 'myOptions',
      label: 'My Options',
      type: 'MultiChoice',
      options: ['A', 'B', 'C'],
      default: ['A', 'C'],
    },
  ] as MetadataAccount[];

  return (
    <LoginGate host={host} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token }) => <Accounts host={host} metadataAccounts={metadataAccounts} token={token.accessToken.token} />}
    </LoginGate>
  );
};
