import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import AutomationsList from './AutomationsList/AutomationsList';
import { DataSource } from '../api/types';
import { LoginGate } from '../Auth/LoginGate';

export default {
  title: 'Automations Components',
  component: AutomationsList,
} as Meta;


export const AutomationsStory = () => {
  const disabledColumns = ['fullName', 'updated', 'taskId', 'hostId']

  const dataSources = (token) =>
    ({
      token,
      host: 'http://my-kl18',
      connection: 'wf-scalars',
      connectionJobLog: 'wf-jobs',
    }) as DataSource

  return (
    <LoginGate host={process.env.ENDPOINT_URL!} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token: { accessToken } }) => (
        <AutomationsList
          disabledColumns={disabledColumns}
          dataSources={dataSources(accessToken.token)}
        />
      )}
    </LoginGate>
  );
};
