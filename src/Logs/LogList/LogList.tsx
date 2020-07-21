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
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAsyncDebounce, useBlockLayout, useFilters, useGlobalFilter, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { LogData } from './types';

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

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const Table = ({ columns, data }: { columns: any; data: LogData[] }) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];

          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    totalColumnsWidth,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useBlockLayout,
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
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
                <Typography noWrap>
                  {column.render('header')}
                  {/* Render the columns filter UI */}
                  <div>{(column as any).canFilter ? column.render('Filter') : 'nope'}</div>
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left',
            }}
            component="div"
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody {...getTableBodyProps()} component="div">
        <FixedSizeList height={345} itemCount={rows.length} itemSize={35} width={totalColumnsWidth}>
          {RenderRow}
        </FixedSizeList>
      </TableBody>
    </MaUTable>
  );
};

// Define a default UI for filtering
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

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

    if (options.size > 0) {
      return [...options.values()];
    } else {
      return [];
    }
  }, [id, preFilteredRows]);

  console.log(options);

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
        <option key={i} value={option as string}>
          {option}
        </option>
      ))}
    </select>
  );
}

const LogList = (props: LogListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timeZone } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [logsData, setLogsData] = useState<LogData[]>([]);

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

  const columns = React.useMemo(
    () => [
      {
        header: 'Time',
        accessor: 'dateTime',
        width: 200,
      },
      {
        header: 'Level',
        accessor: 'logLevel',
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

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
};

export { LogListProps, LogList };
