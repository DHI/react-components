import { Meta } from '@storybook/react/types-6-0.d';
import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { fetchToken } from '../DataServices/DataServices';
import { LogList } from './LogList/LogList';

export default {
  title: 'Logs Components',
  component: LogList,
} as Meta;

export const LogListStory = () => {
  const [token, setToken] = useState<string>();

  const dataSources = [
    {
      host: process.env.ENDPOINT_URL,
      connection: 'postgres-logger',
    },
    {
      host: process.env.ENDPOINT_URL,
      connection: 'postgres-logger1',
    },
    {
      host: process.env.ENDPOINT_URL,
      connection: 'postgres-logger2',
    },
  ];

  const disabledColumns = ['id', 'machineName', 'tag'];

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
      <LogList
        frequency={30}
        token={token}
        startTimeUtc={addDays(new Date(), -2).toISOString()}
        dataSources={dataSources}
        disabledColumns={disabledColumns}
        dateTimeFormat={'yyyy-MM-dd HH:mm:ss'}
        timeZone={'Asia/Jakarta'}
        translations={{
          noEntriesData: 'Tidak ada entri log',
          noEntriesFilter: 'Tidak ada entri log untuk level log yang dipilih',
        }}
        onReceived={(data) => {
          console.log(data);
        }}
      />
    );
  }

  return null;
};
