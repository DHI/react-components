import React, { useEffect, useState } from 'react';
import { fetchToken } from '../DataServices/DataServices';
import { JobList } from './JobList/JobList';

export default {
  title: 'Jobs Components',
  component: [JobList],
};

export const JobListStory = () => {
  const [token, setToken] = useState<string>();

  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'wf-jobs',
      connectionJobLog: 'postgres-workflowLogging',

    },
    // {
    //   host: "https://api-dev.seaportopx.com",
    //   connection: "MarineAid-Jobs-AdHoc",
    //   connectionJobLog: "MarineAid-Logs-AdHoc"
    // }
  ];
  const disabledColumns = ['accountId'];

  const parameters = [
    {
      parameter: 'Area',
      label: 'Area',
    },
  ];

  useEffect(() => {
    fetchToken(process.env.ENDPOINT_URL, {
      id: process.env.USERUSER!,
      password: process.env.USERPASSWORD!,
    }).subscribe(
      (res) => {
        setToken(res.accessToken.token);
      },
      (err) => {
        console.log(err);
        console.log('Error Fetching Token');
      },
    );
  }, []);

  if (token) {
    return (
      <JobList
        frequency={10}
        token={token}
        dataSources={dataSources}
        disabledColumns={disabledColumns}
        parameters={parameters}
        dateTimeFormat={'yyyy-MM-dd HH:mm:ss'}
        startTimeUtc={'2020-06-30T01:45:34'}
        timeZone={'Asia/Jakarta'}
        translations={{
          noEntriesData: 'Tidak ada entri job',
          noEntriesFilter: 'Tidak ada entri job untuk status job yang dipilih',
        }}
        onReceived={(data) => {
          console.log(data);
        }}
      />
    );
  }

  return null;
};
