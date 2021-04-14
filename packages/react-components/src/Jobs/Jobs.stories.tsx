import { Meta } from '@storybook/react/types-6-0.d';
import { addDays } from 'date-fns';
import React from 'react';
import { LoginGate } from '../Auth/LoginGate';
import { JobList } from './JobList/JobList';

export default {
  title: 'Jobs Components',
  component: JobList,
} as Meta;

export const JobListStory = () => {
  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'wf-jobs',
      connectionJobLog: 'postgres-workflowLogging',
    },
    // {
    //   host: "https://api-dev.seaportopx.com",
    //   connection: "MarineAid-Jobs-NCOS",
    //   connectionJobLog: "MarineAid-Logs-NCOS"
    // }
  ];

  const disabledColumns = ['accountId', 'Area'];

  const parameters = [
    {
      parameter: 'Area',
      label: 'Area',
    },
  ];

  return (
    <LoginGate host={process.env.ENDPOINT_URL} showRememberMe={true} textFieldVariant={'outlined'}>
      {({ token: { accessToken } }) => (
        <JobList
          token={accessToken.token}
          dataSources={dataSources}
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
