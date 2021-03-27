import { Button } from '@material-ui/core';
import { differenceInSeconds, format, parseISO } from 'date-fns';
import React from 'react';
import { TimeseriesData, TimeseriesExporterProps } from './types';

const TimeseriesExporter = (props: TimeseriesExporterProps) => {
  const exportTable = () => {
    const columns = [
      '',
      ...props.data.map(
        (timeseries, index) =>
          (props.timeseries && props.timeseries[index] && props.timeseries[index]?.name) || timeseries.id,
      ),
    ];

    let timesteps: string[] = [];

    props.data.forEach((timeseries) => {
      timesteps = [
        ...timesteps,
        ...timeseries.data.map((timestep: (string | number)[]) =>
          format(parseISO(timestep[0].toString()), "yyyy-MM-dd'T'HH:mm:ss"),
        ),
      ];
    });

    timesteps = timesteps.filter((value, index, self) => self.indexOf(value) === index);

    timesteps = timesteps.map((timestep) => format(parseISO(timestep), "yyyy-MM-dd'T'HH:mm:ss"));

    timesteps.sort((a, b) => differenceInSeconds(new Date(a), new Date(b)));

    let table: string[][] = [];

    timesteps.forEach((datetime: string) => {
      const cells = [format(parseISO(datetime), props.dateTimeFormat || 'yyyy-MM-dd HH:mm:ss')];
      const dateTimeLookup = format(parseISO(datetime), "yyyy-MM-dd'T'HH:mm:ss");

      props.data.forEach((timeseries: TimeseriesData, index: number) => {
        const found = timeseries.data.filter((timestep: (string | number)[]) => timestep[0] === dateTimeLookup);

        cells.push(
          found.length === 1
            ? props.timeseries && props.timeseries[index] && props.timeseries[index]?.decimals
              ? (found[0][1] as number).toFixed(props.timeseries[index]!.decimals!)
              : found[0][1].toString()
            : '',
        );
      });

      table = [...table, cells];
    });

    const csv = columns.join(', ') + table.map((row) => `\r\n${row.join(', ')}`);
    const link = document.createElement('a');

    link.setAttribute('href', encodeURI(`data:text/csv;charset=utf-8,${csv}`));

    link.setAttribute('download', !props.exportFileName ? 'Export.csv' : `${props.exportFileName}.csv`);

    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <Button onClick={() => exportTable()} color={props.color || 'primary'} variant={props.variant || 'contained'}>
        {props.caption || 'Download'}
      </Button>
    </div>
  );
};

export { TimeseriesExporterProps, TimeseriesData, TimeseriesExporter };
