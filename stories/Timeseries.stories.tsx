import React, { useState, useEffect } from 'react';
import { ChartPlotly, fetchToken, fetchTimeseriesValues } from '../src';
import { withKnobs } from '@storybook/addon-knobs';
import { IChartPlotlyPlotData } from '../src/Timeseries/ChartPlotly/types';

export default {
  title: 'Timeseries Components',
  component: [ChartPlotly],
  decorators: [withKnobs],
};

export const ChartPlotlyTimeseries = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchToken(dataSources[0].host, {
      id: 'demo',
      password: 'demo',
    }).subscribe(
      res => {
        fetchTimeseriesValues(dataSources, res.accessToken.token).subscribe(
          data => {
            console.log(data);
            setData(data);
          }
        );
      },
      err => {
        console.log(err);
      }
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
  ] as Partial<IChartPlotlyPlotData>[];

  const config = {
    displayModeBar: false,
  };

  const dataSources = [
    {
      connection: 'mclite-timeseries',
      host: 'https://domainservices.dhigroup.com',
      from: '2012-10-30T00:00:00',
      to: '2012-11-07T00:00:00',
      ids: [
        'Telemetry/Catchment rainfall/6790_HUDINJA_SKOFJA_VAS_Rainfall.dfs0 [weighted]',
        'Telemetry/Catchment rainfall/7060_KRKA_SOTESKA_Rainfall.dfs0 [weighted]',
      ],
    },
    {
      connection: 'mclite-timeseries',
      host: 'https://domainservices.dhigroup.com',
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
        data={data}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export const ChartPlotlyArrows = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchToken(dataSources[0].host, {
      id: 'demo',
      password: 'demo',
    }).subscribe(
      res => {
        fetchTimeseriesValues(dataSources, res.accessToken.token).subscribe(
          data => {
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
          }
        );
      },
      err => {
        console.log(err);
      }
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
      arrowMaxCount: 20,
      arrowScale: 2,
      isArrow: true,
      fillcolor: 'blue',
    },
    {
      name: 'Name 2',
      type: 'scatter',
      mode: 'lines',
    },
    {
      name: 'Name 2',
      isArrow: true,
      fillcolor: 'red',
    },
  ] as Partial<IChartPlotlyPlotData>[];

  const config = {
    displayModeBar: false,
  };

  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
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
