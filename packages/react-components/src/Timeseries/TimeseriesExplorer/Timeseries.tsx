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
import copy from 'copy-to-clipboard';

const NAME_TEXT_STYLE = {
  padding: 12,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 15,
};

const DATA_ZOOM = [
  {
    type: 'inside',
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
  type: 'time',
  nameLocation: 'center',
  nameTextStyle: NAME_TEXT_STYLE,
  min: 'dataMin',
  max: 'dataMax',
  axisLabel: AXIS_LABEL,
  triggerEvent: true
};

const Y_AXIS = {
  name: '',
  nameLocation: 'center',
  nameTextStyle: NAME_TEXT_STYLE,
  axisLabel: AXIS_LABEL,
};

const TimeseriesExplorer = ({
  dataSource,
  title,
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
    toolbox: {
      feature: {
        dataZoom: {
        },
        restore: {},
        saveAsImage: {}
      }
    },
    grid: GRID,
    dataZoom: DATA_ZOOM,
    legend: {
      orient: 'vertical',
      bottom: 0
    },
    xAxis: X_AXIS,
    yAxis: Y_AXIS,
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let result = '';
        params.forEach((param) => {
          result += `Date: ${new Date(param.data.value[0]).toISOString()} <br/>`;
          result += `Value: ${param.data.value[1]} <br/><br/>`;
        });
        return result;
      }
    },
    series: [],
  });

  const clearDateFilter = () => {
    setDate(initialDateState);
  };

  const fetchTopLevelTreeView = (group = '') => {
    fetchTimeseriesFullNames([dataSource], group.replace(/\/$/, '')).subscribe(
      (res) => {
        const children = addChildren(res, group, true);

        setList(children);
        setLoading(false);
      },
      (error) => console.log(error),
    );
  };

  const addChildren = (childrenList, group, topLevel = false) => {
    const children = [
      ...childrenList.filter((child: string) => child.endsWith('/')).sort(),
      ...childrenList.filter((child: string) => !child.endsWith('/')).sort(),
    ];

    return children.map((child) => ({
      value: child,
      label: child.replace(group, ''),
      topLevel,
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
      fetchTimeseriesFullNames([dataSource], group.replace(/\/$/, '')).subscribe(
        (res) => {
          const children = addChildren(res, group);
          list.map((item) => recursive(item, group, children));

          setList(list);
          setLoading(false);
        },
        (error) => console.log(error),
      );
    }
  };

  useEffect(() => {
    dataSource.ids = ids;
    dataSource.from = date.from;
    dataSource.to = date.to;

    fetchTimeseriesValues([dataSource], dataSource.token).subscribe((res) => {
      const series = res
        .map((item, index) => {
          return {
            name: item.id,
            data: item.data.map((d, idx) => {
              return {
                value: [new Date(d[0]).getTime(), d[1]],
                name: `Point ${index * item.data.length + idx + 1}`
              };
            }),
            symbolSize: 3,
            type: 'line',
            symbol: 'diamond',
            triggerLineEvent: true,
          };
        })
        .filter((item) => item);

      const updatedOptions = {
        ...options,
        xAxis: {
          ...options.xAxis,
          axisLabel: {
            ...options.xAxis.axisLabel,
            formatter: {
              year: '{yyyy}',
              month: '{MMM}',
              day: '{d}',
              hour: '{HH}:{mm}',
              minute: '{HH}:{mm}',
              second: '{HH}:{mm}:{ss}',
              millisecond: '{hh}:{mm}:{ss} {SSS}',
              none: '{yyyy}-{MM}-{dd} {hh}:{mm}:{ss} {SSS}'
            },
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
              <BaseChart
                className="standard_chat"
                chartHeightFunc={() => height - 100}
                options={options}
                onEvents={{
                  click: (params) => {
                    const { seriesName } = params
                    if (seriesName) {
                      copy(seriesName);
                    }
                  },
                }}
                notMerge
              />
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
