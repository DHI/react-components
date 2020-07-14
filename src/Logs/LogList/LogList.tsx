import { Tooltip } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { Column, LogData } from './types';
import useStyles from './useStyles';

const LogList = (props: LogListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timezone } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [logsData, setLogsData] = useState<LogData[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetchLogsList(startTimeUtc);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startDateUtc) {
      interval = setInterval(() => fetchLogsList(startDateUtc), frequency * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startDateUtc]);

  const data = useMemo(() => {
    return logsData;
  }, [logsData]);

  const onClickFilter = () => {
    alert('Filter Clicked');
  };

  const iconConverter = (logLevel: string) => {
    switch (logLevel) {
      case 'Debug':
        return (
          <Tooltip title="Debug">
            <BugReportOutlinedIcon />
          </Tooltip>
        );
      case 'Information':
        return (
          <Tooltip title="Information">
            <InfoOutlinedIcon />
          </Tooltip>
        );
      case 'Error':
        return (
          <Tooltip title="Warning">
            <WarningOutlinedIcon />
          </Tooltip>
        );
      case 'Warning':
        return (
          <Tooltip title="Error">
            <ErrorOutlineOutlinedIcon />
          </Tooltip>
        );
      case 'Critical':
        return (
          <Tooltip title="Critical">
            <ErrorOutlineOutlinedIcon />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const fetchLogsList = (dateTimeValue: string) => {
    console.log(dateTimeValue);
    const query = [{ Item: 'DateTime', Value: dateTimeValue, QueryOperator: 'GreaterThan' }];

    fetchLogs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawLogs = res.map((s: { data: LogData }) => {
          const localDate = format(utcToZonedTime(s.data.dateTime, timezone), dateTimeFormat);

          s.data.dateTime = localDate;

          const logIcon = iconConverter(s.data.logLevel);

          s.data.logLevel = logIcon;

          return s.data;
        });

        setLogsData(logsData?.concat(rawLogs));

        const utcDate = zonedTimeToUtc(new Date(), timezone);
        const utcDateFormated = utcDate.toISOString().split('.').shift();

        setStartDateUtc(utcDateFormated);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Time',
        accessor: 'dateTime',
        style: { whiteSpace: 'unset' },
      },
      {
        Header: 'Level',
        accessor: 'logLevel',
        filter: true,
        style: { whiteSpace: 'unset' },
      },
      {
        Header: 'Source',
        accessor: 'source',
        filter: true,
        style: { whiteSpace: 'unset' },
      },
      {
        Header: 'Text',
        accessor: 'text',
        style: { whiteSpace: 'unset' },
      },
    ],
    [],
  );

  const Table = (columns: Column[], data: LogData[]) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow } = useTable(
      {
        columns,
        data,
      },
      useBlockLayout,
    );

    const RenderRow = useCallback(
      ({ index, style }) => {
        const row = rows[index];

        prepareRow(row);

        return (
          <div
            {...row.getRowProps({
              style,
            })}
            className="tr"
          >
            {row.cells.map(
              (cell: {
                getCellProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLDivElement> &
                  React.HTMLAttributes<HTMLDivElement>;
                render: (arg0: string) => React.ReactNode;
              }) => {
                return (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                );
              },
            )}
          </div>
        );
      },
      [prepareRow, rows],
    );

    // Render the UI for your table
    return (
      <div {...getTableProps()} className={classes.table}>
        <div>
          {headerGroups.map(
            (headerGroup: {
              getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLDivElement> &
                React.HTMLAttributes<HTMLDivElement>;
              headers: any[];
            }) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            ),
          )}
        </div>

        <div {...getTableBodyProps()}>
          <FixedSizeList height={350} itemCount={rows.length} itemSize={35} width={totalColumnsWidth}>
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CssBaseline />
      {Table(columns, data)}
    </div>
  );
};

export { LogListProps, LogList };
