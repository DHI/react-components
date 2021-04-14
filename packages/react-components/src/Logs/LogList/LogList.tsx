import {
  FilteringState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  Grid,
  TableColumnVisibility,
  TableFilterRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Paper } from '@material-ui/core';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchLogs } from '../../api';
import Loading from '../../common/Loading/Loading';
import { DefaultColumnsTypeProvider } from '../../common/Table';
import { CustomCell, FilterCellRow } from './helpers';
import LogListProps, { LogData } from './types';
import useStyles from './useStyles';

const DEFAULT_COLUMNS = [
  { title: 'Time', name: 'dateTime' },
  { title: 'ID', name: 'id' },
  { title: 'Level', name: 'logLevel' },
  { title: 'Machine Name', name: 'machineName' },
  { title: 'Source', name: 'source' },
  { title: 'Tag', name: 'tag' },
  { title: 'Text', name: 'text' },
];

const LogList = (props: LogListProps) => {
  const [columns] = useState(DEFAULT_COLUMNS);
  const classes = useStyles();
  const {
    frequency,
    dataSources,
    disabledColumns,
    token,
    startTimeUtc,
    dateTimeFormat,
    timeZone,
    translations,
    onReceived,
  } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [logsData, setLogsData] = useState<LogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [defaultColumnsNameArray] = useState<string[]>(DEFAULT_COLUMNS.map((column) => column.name));
  const [tableColumnExtensions] = useState([
    { columnName: 'dateTime', width: 200 },
    { columnName: 'logLevel', width: 100 },
    { columnName: 'source', width: 180 },
    { columnName: 'text', wordWrapEnabled: true },
  ]);

  const onLogsRecieved = (data: LogData[]) => {
    return data.reduce(function (obj, v) {
      obj[v.logLevel] = (obj[v.logLevel] || 0) + 1;

      return obj;
    }, {});
  };

  const data = useMemo(() => {
    setLoading(false);

    if (onReceived) {
      onReceived(onLogsRecieved(logsData));
    }

    return logsData;
  }, [logsData]);

  const fetchLogsList = (dateTimeValue: string) => {
    setLoading(true);
    const query = [{ Item: 'DateTime', Value: dateTimeValue, QueryOperator: 'GreaterThan' }];

    fetchLogs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawLogs = res.map((s: { data: LogData }) => {
          s.data.dateTime = format(utcToZonedTime(s.data.dateTime, timeZone), dateTimeFormat);

          return s.data;
        });

        setLogsData(rawLogs.concat(logsData));

        const utcDate = zonedTimeToUtc(new Date(), timeZone);
        const utcDateFormated = utcDate.toISOString().split('.').shift();

        setStartDateUtc(utcDateFormated);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    fetchLogsList(startTimeUtc);
  }, []);

  useEffect(() => {
    let interval: any;

    if (startDateUtc) {
      interval = setInterval(() => fetchLogsList(startDateUtc), frequency * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startDateUtc]);

  return (
    <div className={classes.wrapper}>
      <Paper style={{ position: 'relative' }}>
        {loading && <Loading />}

        <Grid rows={data} columns={columns}>
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />

          <SortingState defaultSorting={[{ columnName: 'dateTime', direction: 'desc' }]} />
          <IntegratedSorting />

          <GroupingState />
          <IntegratedGrouping />

          <VirtualTable
            height={windowHeight - 230}
            cellComponent={CustomCell}
            columnExtensions={tableColumnExtensions}
          />

          <DefaultColumnsTypeProvider for={defaultColumnsNameArray} />

          <TableHeaderRow />
          <TableFilterRow cellComponent={FilterCellRow} />

          <Toolbar />

          <TableColumnVisibility defaultHiddenColumnNames={disabledColumns} />
          <ColumnChooser />
        </Grid>
      </Paper>
    </div>
  );
};

export { LogListProps, LogList };
