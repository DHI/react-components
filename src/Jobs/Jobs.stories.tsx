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
      host: process.env.ENDPOINT_URL,
      connection: 'wf-jobs',
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
        frequency={30}
        token={token}
        dataSources={dataSources}
        dateTimeFormat={'yyyy-MM-dd HH:mm:ss'}
        startTimeUtc={'2010-06-30T01:45:34'}
        timeZone={'Asia/Jakarta'}
      />
    );
  }

  return null;
};
