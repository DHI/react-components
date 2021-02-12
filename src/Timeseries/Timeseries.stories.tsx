import { withKnobs } from '@storybook/addon-knobs';
import React, { useEffect, useState } from 'react';
import AuthService from '../Auth/AuthService';
import { fetchTimeseriesValues, fetchToken } from '../DataServices/DataServices';
import { ChartPlotly } from './ChartPlotly/ChartPlotly';
import { ChartPlotlyPlotData } from './ChartPlotly/types';
import { TimeseriesExporter } from './TimeseriesExporter/TimeseriesExporter';
import DHITreeViewWidget from './TreeView/TestTree';
import TreeView from './TreeView/TreeView';

export default {
  title: 'Timeseries Components',
  component: [ChartPlotly, TimeseriesExporter],
  decorators: [withKnobs],
};

export const ChartPlotlyTimeseriesStory = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetchToken(dataSources[0].host, {
      id: process.env.USERUSER,
      password: process.env.USERPASSWORD,
    }).subscribe(
      (res) => {
        fetchTimeseriesValues(dataSources, res.accessToken.token).subscribe((data) => {
          console.log(data);
          setData(data);
        });
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  const layout = {
    title: 'Example Chart',
    showlegend: false,
    autosize: true,
    margin: {
      l: 40,
      r: 50,
      b: 75,
      t: 50,
      pad: 0,
    },
    xaxis: {
      title: 'Time',
      showgrid: false,
    },
    yaxis: {
      title: 'Bench Levels',
      showgrid: true,
      linewidth: 0,
      gridwidth: 2,
      gridcolor: '#eee',
    },
  };

  const timeseries = [
    {
      name: 'Name 1',
      type: 'scatter',
      mode: 'lines+markers',
    },
    {
      name: 'Name 2',
      type: 'scatter',
      mode: 'markers',
    },
    {
      name: 'Name 3',
      type: 'scatter',
      mode: 'lines+markers',
    },
    {
      name: 'Name 4',
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: 'red',
        width: 1,
        dash: 'dashdot',
      },
    },
  ] as Partial<ChartPlotlyPlotData>[];

  const config = {
    displayModeBar: false,
  };

  const dataSources = [
    {
      connection: 'mclite-timeseries',
      host: process.env.ENDPOINT_URL,
      from: '2012-10-30T00:00:00',
      to: '2012-11-07T00:00:00',
      ids: [
        'Telemetry/Catchment rainfall/6790_HUDINJA_SKOFJA_VAS_Rainfall.dfs0 [weighted]',
        'Telemetry/Catchment rainfall/7060_KRKA_SOTESKA_Rainfall.dfs0 [weighted]',
      ],
    },
    {
      connection: 'mclite-timeseries',
      host: process.env.ENDPOINT_URL,
      from: '2012-10-30T00:00:00',
      to: '2012-11-07T00:00:00',
      ids: [
        'Telemetry/Catchment rainfall/GRADASCICA_BOKALCI_Rainfall.dfs0 [weighted]',
        'Telemetry/Catchment rainfall/KRKA_PODBOCJE_Rainfall.dfs0 [weighted]',
      ],
    },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ChartPlotly
        layout={layout}
        timeseries={timeseries}
        data={data!}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export const ChartPlotlyArrowsStory = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetchToken(dataSources[0].host, {
      id: process.env.USERUSER!,
      password: process.env.USERPASSWORD!,
    }).subscribe(
      (res) => {
        fetchTimeseriesValues(dataSources, res.accessToken.token).subscribe((data) => {
          data = [
            ...data,
            {
              id: data[0].id,
              data: data[0].data.map((point: number[]) => {
                return [point[0], point[1] + 30];
              }),
            },
          ];

          setData(data);
        });
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  const layout = {
    title: 'Example Chart With Arrows',
    showlegend: false,
    autosize: true,
    margin: {
      l: 40,
      r: 50,
      b: 75,
      t: 50,
      pad: 0,
    },
    xaxis: {
      title: 'Time',
      showgrid: false,
    },
    yaxis: {
      title: 'Bench Levels',
      showgrid: true,
      linewidth: 0,
      gridwidth: 2,
      gridcolor: '#eee',
      range: [-3, 15],
    },
  };

  const timeseries = [
    {
      name: 'Name 1',
      arrowMaxCount: 10,
      arrowScale: 1.3,
      isArrow: true,
      fillcolor: '#1F77B4',
    },
    {
      name: 'Name 2',
      type: 'scatter',
      mode: 'lines',
    },
    {
      name: 'Name 2',
      isArrow: true,
      fillcolor: '#C423AE',
    },
  ] as Partial<ChartPlotlyPlotData>[];

  const config = {
    displayModeBar: false,
  };

  const dataSources = [
    {
      host: process.env.ENDPOINT_URL!,
      connection: 'mclite-timeseries',
      from: '2020-01-05T00:00:00',
      to: '2020-02-10T00:00:00',
      ids: ['Wind/Direction', 'Wind/Speed'],
    },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ChartPlotly
        layout={layout}
        timeseries={timeseries}
        data={data}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
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

export const TreeViewStory = () => {
  const host = process.env.ENDPOINT_URL;

  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'mclite-timeseries',
    },
  ];

  // TODO: add LoginGate;
  const auth = new AuthService(host);
  const session = auth.getSession();

  return <TreeView dataSources={dataSources} token={session.accessToken} />;
};

export const DHITreeViewStory = () => {
  const host = process.env.ENDPOINT_URL;

  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'mclite-timeseries',
      group: '',
    },
  ];

  // TODO: add LoginGate;
  const auth = new AuthService(host);
  const session = auth.getSession();

  return <DHITreeViewWidget dataSources={dataSources} token={session.accessToken} />;
};
