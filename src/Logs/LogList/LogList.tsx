import { Tooltip, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockLayout, useFilters, useGlobalFilter, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { Column, LogData } from './types';

const LogList = (props: LogListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timeZone } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [logsData, setLogsData] = useState<LogData[]>([]);

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
        return (
          <Tooltip title="Unknown">
            <WarningOutlinedIcon />
          </Tooltip>
        );
    }
  };

  const fetchLogsList = (dateTimeValue: string) => {
    console.log(dateTimeValue);
    const query = [{ Item: 'DateTime', Value: dateTimeValue, QueryOperator: 'GreaterThan' }];

    fetchLogs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawLogs = res.map((s: { data: LogData }) => {
          const localDate = format(utcToZonedTime(s.data.dateTime, timeZone), dateTimeFormat);

          s.data.dateTime = localDate;

          const logIcon = iconConverter(s.data.logLevel);

          s.data.logLevelIcon = logIcon;

          return s.data;
        });

        setLogsData(logsData?.concat(rawLogs));

        const utcDate = zonedTimeToUtc(new Date(), timeZone);
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
        header: 'Time',
        accessor: 'dateTime',
        width: 180,
      },
      {
        header: 'Level',
        accessor: 'logLevelIcon',
        width: 80,
        filter: 'includes',
      },
      {
        header: 'Source',
        accessor: 'source',
        width: 180,
      },
      {
        header: 'Text',
        accessor: 'text',
        width: 365,
      },
    ],
    [],
  );

  const Table = (columns: Column[], data: LogData[]) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      {
        columns,
        data,
      },
      useBlockLayout,
      useFilters,
      useGlobalFilter,
    );

    const RenderRow = useCallback(
      ({ index, style }) => {
        const row = rows[index];

        prepareRow(row);

        return (
          <TableRow
            {...row.getRowProps({
              style,
            })}
          >
            {row.cells.map((cell: { render: (arg0: string) => React.ReactNode }) => {
              return (
                <TableCell>
                  <Typography noWrap>{cell.render('Cell')}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        );
      },
      [prepareRow, rows],
    );

    return (
      <MaUTable {...getTableProps()} size="small" aria-label="a dense table">
        <TableHead>
          {headerGroups.map((headerGroup: { headers: Column[] }) => (
            <TableRow>
              {headerGroup.headers.map((column: any) => (
                <TableCell {...column.getHeaderProps()}>
                  <Typography noWrap>{column.render('header')}</Typography>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          <FixedSizeList height={345} itemCount={rows.length} itemSize={35}>
            {RenderRow}
          </FixedSizeList>
        </TableBody>
      </MaUTable>
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
