import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import { DataSource } from '../api/types';
import { LoginGate } from '../Auth/LoginGate';
import { ScalarList } from './ScalarList/ScalarList';

export default {
  title: 'Scalar Components',
  component: ScalarList,
} as Meta;

export const ScalarListStory = () => {
  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'postgres-scalars',
    } as DataSource,
  ];

  return (
    <LoginGate host={process.env.ENDPOINT_URL!} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token: { accessToken } }) => (
        <ScalarList
          timeZone="Australia/Brisbane"
          dataSources={dataSources}
          token={accessToken.token}
          dateTimeFormat="yyyy-MM-dd HH:mm:ss"
        />
      )}
    </LoginGate>
  );
};
