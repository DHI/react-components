import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { Column, LogData } from './types';

const LogList = (props: LogListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timezone } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [logsData, setLogsData] = useState<LogData[]>([]);

  useEffect(() => {
    fetchLogsList(startTimeUtc);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => fetchLogsList(startDateUtc), frequency * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startDateUtc]);

  const fetchLogsList = (dateTimeValue: string | undefined) => {
    console.log(dateTimeValue);
    const query = [{ Item: 'DateTime', Value: dateTimeValue, QueryOperator: 'GreaterThan' }];

    fetchLogs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawLogs = res.map((s: { data: LogData }) => {
          const localDate = format(utcToZonedTime(s.data.dateTime, timezone), dateTimeFormat);

          s.data.dateTime = localDate;

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
      },
      {
        Header: 'Level',
        accessor: 'logLevel',
      },
      {
        Header: 'Source',
        accessor: 'source',
      },
      {
        Header: 'Text',
        accessor: 'text',
      },
    ],
    [],
  );

  const data = logsData;

  const Table = (columns: Column[], data: LogData[]) => {
    console.log(logsData);
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(
            (headerGroup: {
              getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLTableRowElement> &
                React.HTMLAttributes<HTMLTableRowElement>;
              headers: Column[];
            }) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ),
          )}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row: {
              getRowProps: () => JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLTableRowElement> &
                React.HTMLAttributes<HTMLTableRowElement>;
              cells: LogData[];
            }) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    );
  };

  return <div>{Table(columns, data)}</div>;
};

export { LogListProps, LogList };
