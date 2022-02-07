import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { fetchTimeseriesFullNames, fetchTimeseriesValues } from '../../api';
import { BaseChart } from '../../ECharts/BaseChart';
import { recursive } from '../../utils/Utils';
import TreeView from '../TreeView/TreeView';
import { TimeseriesStyles } from './styles';
import { TimeseriesProps } from './types';
import { DateFilter } from '../../common/DateFilter/DateFilter';
import { DateProps } from '../../common/types';
import { useWindowSize } from '@react-hook/window-size';
import mikeColors from '../../ThemeProvider/mikeColors';

const NAME_TEXT_STYLE = {
  padding: 12,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 15,
};

const DATA_ZOOM = [
  {
    type: 'inside',
  },
  {
    type: 'slider',
    height: 40,
    bottom: 10,
    labelFormatter: (value) => (value ? format(value, 'dd MMM yyyy') : ''),
  },
];

const GRID = {
  bottom: 100,
  top: 80,
};

const TEXT_STYLE = {
  width: '100%',
  color: mikeColors.BRANDBLUE_DEFAULT,
  fontWeight: 'bold',
  fontSize: window.innerHeight >= 1200 ? 24 : 18,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
};

const AXIS_LABEL = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 12,
  color: mikeColors.BRANDBLUE_DEFAULT,
};

const X_AXIS = {
  name: 'Time',
  nameLocation: 'center',
  nameTextStyle: NAME_TEXT_STYLE,
  min: 'dataMin',
  axisLabel: AXIS_LABEL,
};

const Y_AXIS = {
  name: '',
  nameLocation: 'center',
  nameTextStyle: NAME_TEXT_STYLE,
  axisLabel: AXIS_LABEL,
};

const LEGEND_STYLE = {
  backgroundColor: 'rgba(255,255,255,1)',
  padding: 8,
  borderRadius: 5,
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowBlur: 5,
  shadowOffsetX: 3,
  shadowOffsetY: 3,
};

const TimeseriesExplorer = ({
  token,
  dataSources,
  title,
  legendPosition = 'right',
  legendPositionOffset,
  startTimeUtc,
  dateTimeFormat,
  timeZone,
}: TimeseriesProps) => {
  const initialDateState = {
    from: new Date(startTimeUtc).toISOString(),
    to: new Date().toISOString(),
  };

  const [width, height] = useWindowSize();
  const classes = TimeseriesStyles();
  const [date, setDate] = useState<DateProps>(initialDateState);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState<string[]>([]);

  const [options, setOptions] = useState({
    title: {
      text: title,
      left: 'center',
      textStyle: TEXT_STYLE,
    },
    grid: GRID,
    dataZoom: DATA_ZOOM,
    legend: {
      ...LEGEND_STYLE,
      top: legendPosition === 'left' ? 90 : 35,
      left: legendPosition === 'left' ? legendPositionOffset ?? 150 : undefined,
      right: legendPosition === 'right' ? legendPositionOffset ?? 60 : undefined,
      align: legendPosition,
    },
    xAxis: X_AXIS,
    yAxis: Y_AXIS,
    tooltip: {},
    series: [],
  });

  const clearDateFilter = () => {
    setDate(initialDateState);
  };

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

  useEffect(() => {
    dataSources[0].ids = ids;
    dataSources[0].from = date.from;
    dataSources[0].to = date.to;

    fetchTimeseriesValues(dataSources, token).subscribe((res) => {
      const series = res
        .map((item) => {
          return {
            name: item.id,
            data: item.data.map((d) => [new Date(d[0]).getTime(), d[1]]),
            type: 'line',
            symbol: 'diamond',
          };
        })
        .filter((item) => item);

      const updatedOptions = {
        ...options,
        xAxis: {
          ...options.xAxis,
          axisLabel: {
            ...options.xAxis.axisLabel,
            formatter: (value) => format(value, 'dd MMM yyyy'),
          },
        },
        yAxis: {
          ...options.yAxis,
          axisLabel: {
            ...options.yAxis.axisLabel,
            formatter: (value) => value,
          },
        },
        legend: {
          ...options.legend,
          data: series.map((item) => item.name),
        },
        series,
      };

      setOptions(updatedOptions);
    });
  }, [date, ids]);

  useEffect(() => {
    fetchTopLevelTreeView();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} className={classes.sidebar} style={{ height }}>
          <TreeView
            list={list}
            onExpand={(expand) => handleOnExpand(expand)}
            onChecked={(checked) => setIds(checked)}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {options.series.length > 0 ? (
            <DateFilter
              dateTimeFormat={dateTimeFormat}
              startTimeUtc={startTimeUtc}
              timeZone={timeZone}
              date={date}
              onSetDate={(date) => setDate(date)}
              onClearDateFilter={clearDateFilter}
            >
              <BaseChart className="standard_chat" chartHeightFunc={() => height - 100} options={options} notMerge />
            </DateFilter>
          ) : (
            <>
              <Typography variant="h6" className={classes.typography}>
                No Timeseries Selected or no data available
              </Typography>
              <Skeleton variant="rect" animation="wave" height={height * 0.2} />
              <Skeleton variant="text" animation="wave" height={height * 0.1} className={classes.skeleton} />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export { TimeseriesExplorer, TimeseriesProps };
