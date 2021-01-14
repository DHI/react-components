import { Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import { LoginGate } from '../Auth/LoginGate';
import { MetadataProps } from '../common/Metadata/types';
import { Accounts } from './Accounts';

export default {
  title: 'Accounts',
  component: Accounts,
} as Meta;

const host = process.env.ENDPOINT_URL;

export const AccountsStory = () => {
  const metadata = [
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
      regEx: '[a-zA-Z]*:',
      regExError: 'The string must have a colon in it',
    },
    {
      key: 'myOptions',
      label: 'My Options',
      type: 'MultiChoice',
      options: ['A', 'B', 'C'],
      default: ['A', 'C'],
    },
    {
      key: 'myMultiText',
      label: 'Multi Text',
      type: 'MultiText',
      default: ['127.0.0.1', '0.0.0.10'],
    },
  ] as MetadataProps[];

  const userGroupsDefaultSelected = [
    {
      id: 'Editors',
      name: 'Editors',
    },
  ];

  return (
    <LoginGate host={host} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token }) => (
        <Accounts
          host="https://auth.seaportopx.com"
          metadata={metadata}
          userGroupsDefaultSelected={userGroupsDefaultSelected}
          token={token.accessToken.token}
        />
      )}
    </LoginGate>
  );
};
