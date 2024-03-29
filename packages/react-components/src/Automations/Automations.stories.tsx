import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import { AutomationsList } from './AutomationsList/AutomationsList';
import { DataSource } from '../api/types';
import { LoginGate } from '../Auth/LoginGate';

export default {
  title: 'Automations Components',
  component: AutomationsList,
} as Meta;


export const AutomationsStory = () => {
  const disabledColumns = ['fullName', 'updated', 'hostId', 'triggerCondition.conditional', 'triggerCondition.isMet',]
  const disabledTextField = {
    name: true,
    group: true
  }
  const dataSources = (token) =>
    ({
      token,
      authHost: 'http://my-kl18/Auth',
      host: 'http://my-kl18/DSWebAPI',
      connection: 'wf-scalars',
      connectionJobLog: 'wf-jobs',
    }) as DataSource

  return (
    <LoginGate host={`http://my-kl18/Auth`} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token: { accessToken } }) => (
        <AutomationsList
          disabledColumns={disabledColumns}
          dataSources={dataSources(accessToken.token)}
          jobReferringPage={'jobs'}
          disabledTextField={disabledTextField}
          disabledTriggerNow={false}
        />
      )}
    </LoginGate>
  );
};
