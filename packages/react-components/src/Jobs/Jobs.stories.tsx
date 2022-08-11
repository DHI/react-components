import { Meta } from '@storybook/react/types-6-0.d';
import { addDays } from 'date-fns';
import React from 'react';
import { DataSource } from '../api/types';
import { LoginGate } from '../Auth/LoginGate';
import { JobList } from './JobList/JobList';

export default {
  title: 'Jobs Components',
  component: JobList,
} as Meta;

export const JobListStory = () => {
  // const dataSources = (token) => {
  //   token = '';
  //   return [
  //     {
  //       token,
  //       host: 'https://adhoc.ozsea.online',
  //       connection: 'OzSea-Exe',
  //       tokenJobLog: `${token}`,
  //       hostJobLog: 'https://logging.seaportopx.com',
  //       connectionJobLog: 'logs',
  //     } as DataSource,
  //   ];
  // };

  const dataSources = (token) => [
    {
      token,
      host: 'https://domainservices.dhigroup.com',
      connection: 'wf-jobs',
      tokenJobLog: `${token}`,
      hostJobLog: 'https://domainservices.dhigroup.com',
      connectionJobLog: 'postgres-workflowLogging',
    } as DataSource,
  ];

  const disabledColumns = ['accountId', 'Area'];

  const parameters = [
    {
      parameter: 'Area',
      label: 'Area',
    },
  ];

  return (
    <LoginGate host={process.env.ENDPOINT_URL!} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token: { accessToken } }) => (
        <JobList
          dataSources={dataSources(accessToken.token)}
          disabledColumns={disabledColumns}
          parameters={parameters}
          dateTimeFormat="yyyy-MM-dd HH:mm:ss"
          startTimeUtc={addDays(new Date(), -2).toISOString()}
          timeZone="Australia/Brisbane"
          translations={{
            noEntriesData: 'Tidak ada entri job',
            noEntriesFilter: 'Tidak ada entri job untuk status job yang dipilih',
          }}
          onReceived={(data) => {
            console.log(data);
          }}
        />
      )}
    </LoginGate>
  );
};
