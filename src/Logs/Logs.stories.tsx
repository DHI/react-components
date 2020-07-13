import React, { useEffect, useState } from 'react';
import { fetchToken, LogList } from '..';

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
        frequency={10}
        token={token}
        dataSources={dataSources}
        dateTimeFormat={'yyyy-MM-dd HH:mm:ss'}
        startTimeUtc={'2020-05-05T01:45:34'}
        timezone={'Asia/Jakarta'}
      />
    );
  }

  return null;
};
