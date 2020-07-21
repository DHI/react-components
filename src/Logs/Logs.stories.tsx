import React, { useEffect, useState } from 'react';
import { fetchToken } from '../DataServices/DataServices';
import { LogList } from './LogList/LogList';

export default {
  title: 'Logs Components',
  component: [LogList],
};

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
        dataSources={dataSources}
        dateTimeFormat={'yyyy-MM-dd HH:mm:ss'}
        startTimeUtc={'2020-06-30T01:45:34'}
        timeZone={'Asia/Jakarta'}
      />
    );
  }

  return null;
};
