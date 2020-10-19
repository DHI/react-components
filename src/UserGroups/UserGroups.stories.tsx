import * as React from 'react';
import { LoginGate } from '../Auth/LoginGate';
import { UserGroups } from './UserGroups';
import { MetadataProps } from '../common/Metadata/types';

export default {
  title: 'User Groups',
  component: [UserGroups],
};

const host = process.env.ENDPOINT_URL;

export const UserGroupStory = () => {
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

  return (
    <LoginGate host={host} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token }) => <UserGroups host={host} metadata={metadata} token={token.accessToken.token} />}
    </LoginGate>
  );
};
