import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { fetchTimeseriesFullNames } from '../../DataServices/DataServices';
import { DataSource } from '../../DataServices/types';
import { TimeseriesStyles } from './styles';

export interface TimeseriesProps {
  token: string;
  dataSources: DataSource[];
}

const Timeseries: FC<TimeseriesProps> = ({ token, dataSources }) => {
  const classes = TimeseriesStyles();
  const [list, setList] = useState([]);

  const fetchTopLevelTreeView = (group = '') => {
    fetchTimeseriesFullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
      (res) => {
        const data = res.map((d) => ({
          value: d,
          label: d,
          topLevel: true,
          ...(d.slice(-1) === '/' && {
            children: [
              {
                value: '',
                label: '',
              },
            ],
          }),
        }));

        setList(data);
      },
      (err) => console.log(err),
    );
  };

  useEffect(() => {
    fetchTopLevelTreeView();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          {/* <DHITreeView /> */}
          TreeView
        </Grid>
        <Grid item xs={12} sm={3}>
          Timeseries
        </Grid>
      </Grid>
    </div>
  );
};

export default Timeseries;
