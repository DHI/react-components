import { withKnobs } from '@storybook/addon-knobs';
import React, { useEffect, useState } from 'react';
import { fetchTimeseriesValues, fetchToken } from '../api';
import { TimeseriesExplorer } from './TimeseriesExplorer/Timeseries';
import { TimeseriesExporter } from './TimeseriesExporter/TimeseriesExporter';

export default {
  title: 'Timeseries Components',
  component: [TimeseriesExplorer, TimeseriesExporter],
  decorators: [withKnobs],
};

export const TimeseriesExporterStory = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetchToken(dataSources[0].host, {
      id: process.env.USERUSER,
      password: process.env.USERPASSWORD,
    }).subscribe(
      (res) => {
        fetchTimeseriesValues(dataSources, res.accessToken.token).subscribe((data) => {
          setData(data);
        });
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  const timeseries = [
    {
      name: 'Timeseries 1',
      decimals: 2,
    },
    {
      name: 'Timeseries 2',
      decimals: 3,
    },
    {
      name: 'Timeseries 3',
      decimals: 3,
    },
    {
      name: 'Timeseries 4',
      decimals: 3,
    },
  ];

  const dataSources = [
    {
      host: process.env.ENDPOINT_URL,
      connection: 'mclite-timeseries',
      from: '2012-10-30T00:00:00',
      to: '2012-11-07T00:00:00',
      ids: [
        'Telemetry/Catchment rainfall/6790_HUDINJA_SKOFJA_VAS_Rainfall.dfs0 [weighted]',
        'Telemetry/Catchment rainfall/7060_KRKA_SOTESKA_Rainfall.dfs0 [weighted]',
      ],
    },
    {
      host: process.env.ENDPOINT_URL,
      connection: 'mclite-timeseries',
      from: '2012-10-30T00:00:00',
      to: '2012-11-07T00:00:00',
      ids: [
        'Telemetry/Catchment rainfall/GRADASCICA_BOKALCI_Rainfall.dfs0 [weighted]',
        'Telemetry/Catchment rainfall/KRKA_PODBOCJE_Rainfall.dfs0 [weighted]',
      ],
    },
  ];

  return (
    <TimeseriesExporter
      color="primary"
      variant="contained"
      dateTimeFormat="dd/MM-yyyy HH-mm-ss"
      exportFileName="SomeExport"
      data={data}
      caption="This is a download button"
      timeseries={timeseries}
    ></TimeseriesExporter>
  );
};

export const TimeseriesExplorerEChart = () => {
  const host = process.env.ENDPOINT_URL;
  const [token, setToken] = useState('');

  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'mclite-timeseries',
    },
  ];

  useEffect(() => {
    fetchToken(host, {
      id: process.env.USERUSER,
      password: process.env.USERPASSWORD,
    }).subscribe(
      (res) => {
        setToken(res.accessToken.token);
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  return token && <TimeseriesExplorer dataSources={dataSources} token={token} title="TimeSeries" />;
};
