import { IconButton, Paper, TableContainer, Tooltip, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
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
    const interval = setInterval(() => fetchLogsList(startDateUtc), frequency * 1000);

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

  const fetchLogsList = (dateTimeValue: string | undefined) => {
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
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });

    // Render the UI for your table
    return (
      <TableContainer component={Paper}>
        <MaUTable {...getTableProps()} className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            {headerGroups.map(
              (headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: Column[];
              }) => (
                <TableRow>
                  {headerGroup.headers.map((column: any) => (
                    <TableCell {...column.getHeaderProps()} size="small">
                      <Typography noWrap>
                        {column.render('Header')}{' '}
                        {column.filter ? (
                          <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list" onClick={onClickFilter}>
                              <FilterListIcon />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ),
            )}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(
              (row: {
                getRowProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                cells: LogData[];
              }) => {
                prepareRow(row);

                return (
                  <TableRow>
                    {row.cells.map((cell: any) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          <Typography noWrap>{cell.render('Cell')}</Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </MaUTable>
      </TableContainer>
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
