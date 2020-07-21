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
import { useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { LogData } from './types';

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

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }: {
    column: {
      filterValue: any;
      setFilter: any;
      preFilteredRows: any;
      id: any;
    };
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();

      preFilteredRows.forEach((row: { values: { [x: string]: unknown } }) => {
        options.add(row.values[id]);
      });

      return [...(options.values() as any)];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  const columns = useMemo(
    () => [
      {
        header: 'Time',
        accessor: 'dateTime',
        width: 200,
      },
      {
        header: 'Level',
        accessor: 'logLevelIcon',
        width: 80,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        header: 'Source',
        accessor: 'source',
        width: 200,
      },
      {
        header: 'Text',
        accessor: 'text',
        width: 400,
      },
    ],
    [],
  );

  const Table = (columns: any, data: LogData[]) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, totalColumnsWidth } = useTable(
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
          <TableRow
            component="div"
            {...row.getRowProps({
              style,
            })}
          >
            {row.cells.map((cell) => {
              return (
                <TableCell {...cell.getCellProps()} component="div">
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
      <MaUTable {...getTableProps()} component="div" size="small" aria-label="a dense table">
        <TableHead component="div">
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()} component="div">
                  <Typography noWrap>{column.render('header')}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()} component="div">
          <FixedSizeList height={345} itemCount={rows.length} itemSize={35} width={totalColumnsWidth}>
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
