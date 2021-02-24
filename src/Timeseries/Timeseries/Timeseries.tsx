import { Grid } from '@material-ui/core';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { fetchTimeseriesFullNames, fetchTimeseriesValues } from '../../DataServices/DataServices';
import { DataSource } from '../../DataServices/types';
import DHITheme from '../../theme';
import { recursive } from '../../utils/Utils';
import { StandardChart } from '../Chart/StandardChart';
import TreeView from '../TreeView/TreeView';
import { TimeseriesStyles } from './styles';

export interface TimeseriesProps {
  token: string;
  dataSources: DataSource[];
  title: string;
  legendPosition?: 'left' | 'right';
  legendPositionOffset?: number;
}

const NAME_TEXT_STYLE = {
  fontSize: 12,
  padding: 20,
};

const Timeseries: FC<TimeseriesProps> = ({
  token,
  dataSources,
  title,
  legendPosition = 'right',
  legendPositionOffset,
}) => {
  const classes = TimeseriesStyles();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    title: {
      text: title,
      left: 'center',
      textStyle: {
        width: '100%',
        color: DHITheme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: window.innerHeight >= 1200 ? 24 : 18,
        fontFamily: 'Roboto',
      },
    },
    grid: {
      bottom: 85,
      right: 30,
    },
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
      },
    ],
    tooltip: {},
    series: [],
  });

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

  const fetchTreeViewChildren = (group) => {
    setLoading(true);

    fetchTimeseriesFullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
      (res) => {
        const children = addChildren(res, group);
        list.map((item) => recursive(item, group, children));

        setList(list);
        setLoading(false); // in place to forceUpdate after the recursive fn updates the object.
      },
      (error) => console.log(error),
    );
  };

  const addChildren = (childrenList, group) => {
    return childrenList.map((child) => ({
      value: child,
      label: child.replace(group, ''),
      ...(child.slice(-1) === '/' && {
        children: [
          {
            value: '',
            label: '',
          },
        ],
      }),
    }));
  };

  const handleOnExpand = (group) => {
    setLoading(true);

    if (group.slice(-1) === '/' || group === '') {
      fetchTimeseriesFullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
        (res) => {
          const children = addChildren(res, group);
          list.map((item) => recursive(item, group, children));

          setList(list);
          setLoading(false); // in place to forceUpdate after the recursive fn updates the object.
        },
        (error) => console.log(error),
      );
    }
  };

  const handleOnCheck = (ids) => {
    dataSources[0].ids = ids;

    fetchTimeseriesValues(dataSources, token).subscribe((res) => {
      const series = res.map((item) => ({
        name: item.id.substring(item.id.lastIndexOf('/') + 1),
        data: item.data.map((d) => [new Date(d[0]).getTime(), d[1]]),
        type: 'scatter',
      }));

      const updatedOptions = {
        ...options,
        yAxis: {
          name: 'Bench Levels',
          nameLocation: 'center',
          nameTextStyle: NAME_TEXT_STYLE,
        },
        xAxis: {
          name: 'Time',
          nameLocation: 'center',
          nameTextStyle: NAME_TEXT_STYLE,
          axisLabel: {
            fontFamily: 'Roboto',
            fontSize: 15,
            color: DHITheme.palette.primary.main,
            formatter: (value) => format(new Date(value), 'dd MM yyyy'),
          },
        },
        legend: {
          top: legendPosition === 'left' ? 70 : 40,
          left: legendPosition === 'left' ? legendPositionOffset ?? 150 : undefined,
          right: legendPosition === 'right' ? legendPositionOffset ?? 60 : undefined,
          align: legendPosition,
          backgroundColor: 'rgba(255,255,255,1)',
          padding: 8,
          borderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowBlur: 5,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          data: series.map((item) => item.name),
        },
        series,
      };

      setOptions(updatedOptions);
    });
  };

  useEffect(() => {
    fetchTopLevelTreeView();
  }, []);

  // const options = {
  //   title: {
  //     text: 'ECharts Standard example',
  //     textStyle: {
  //       color: DHITheme.palette.primary.main,
  //       fontSize: 20,
  //       fontFamily: 'Roboto',
  //     },
  //   },
  //   tooltip: {},
  //   legend: {
  //     data: ['Bench Levels', 'Time'],
  //   },
  //   xAxis: {
  //     name: 'Time',
  //     nameLocation: 'center',
  //     nameTextStyle,
  //     data: ['Oct 31', 'Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5'],
  //   },
  //   yAxis: {
  //     name: 'Bench Levels',
  //     nameLocation: 'center',
  //     nameTextStyle,
  //   },
  //   series: [
  //     {
  //       name: 'Bench Levels',
  //       type: 'bar',
  //       data: [5, 20, 36, 10, 10, 20],
  //     },
  //     {
  //       name: 'Time',
  //       type: 'line',
  //       data: [2, 1, 10, 0, 0, 18],
  //     },
  //   ],
  // };

  console.log(options);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} className={classes.sidebar} style={{ height: window.innerHeight * 0.99 }}>
          <TreeView
            list={list}
            onExpand={(expand) => handleOnExpand(expand)}
            onChecked={(checked) => handleOnCheck(checked)}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {options ? (
            <StandardChart
              className="standard_chat"
              chartHeightFunc={() => window.innerHeight * 0.4}
              options={options}
            />
          ) : (
            'No Timeseries selected'
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Timeseries;
