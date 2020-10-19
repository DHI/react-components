import {
  Box,
  CircularProgress,
  CssBaseline,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { blueGrey, red, yellow } from '@material-ui/core/colors';
import MaUTable from '@material-ui/core/Table';
import {
  HelpOutline,
  BugReportOutlined,
  InfoOutlined,
  ErrorOutlineOutlined,
  WarningOutlined,
  NewReleases,
} from '@material-ui/icons';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  TableInstance,
  useFilters,
  UseFiltersOptions,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  useTable,
  UseTableOptions,
  useBlockLayout,
} from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { LogData } from './types';
import { DefaultColumnFilter, SelectColumnFilter, GlobalFilter } from '../../common/tableHelper';

const LevelIconCell = ({ value }: { value: string }) => {
  switch (value) {
    case 'Debug':
      return (
        <Tooltip title="Debug">
          <BugReportOutlined style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Information':
      return (
        <Tooltip title="Information">
          <InfoOutlined style={{ color: blueGrey[500] }} />
        </Tooltip>
      );
    case 'Error':
      return (
        <Tooltip title="Error">
          <ErrorOutlineOutlined style={{ color: red[900] }} />
        </Tooltip>
      );
    case 'Warning':
      return (
        <Tooltip title="Warning">
          <WarningOutlined style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Critical':
      return (
        <Tooltip title="Critical">
          <NewReleases style={{ color: red[900] }} />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="Unknown">
          <HelpOutline style={{ color: yellow[900] }} />
        </Tooltip>
      );
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  td: {
    flexGrow: '1 !important' as any,
    flexBasis: '5px !important' as any,
    width: 'unset !important' as any,
    maxWidth: 'none !important' as any,
  },
  tdContent: {
    marginLeft: theme.spacing(1),
  },
}));

const Table = ({
  columns,
  data,
  translations,
  loading,
  windowHeight,
}: {
  columns: any;
  data: LogData[];
  translations: any;
  loading: boolean;
  windowHeight: number;
}) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    minWidth: 30,
    maxWidth: 1000,
  };
  const classes = useStyles();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      autoResetFilters: false,
      autoResetGlobalFilter: false,
      columns,
      data,
      defaultColumn,
    } as UseTableOptions<LogData> & UseFiltersOptions<LogData> & UseGlobalFiltersOptions<LogData>,
    useGlobalFilter,
    useBlockLayout,
    useFilters,
  ) as TableInstance<LogData> & UseGlobalFiltersInstanceProps<LogData>;

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
              <TableCell
                {...cell.getCellProps()}
                component="div"
                className={classes.td}
                style={{ minWidth: (cell.column as any).header === 'Text' && '500px' }}
              >
                <Typography noWrap variant="body2" className={classes.tdContent}>
                  {cell.render('Cell')}
                </Typography>
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
        <TableRow component="div">
          <TableCell
            component="div"
            colSpan={visibleColumns.length}
            style={{
              float: 'right',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={(state as any).globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </TableCell>
        </TableRow>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} component="div" className={classes.td}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...column.getHeaderProps()}
                component="div"
                className={classes.td}
                style={{ minWidth: (column as any).header === 'Text' && '500px' }}
              >
                <Box display="flex" flexDirection="row">
                  <Typography variant="subtitle1">{column.render('header')}</Typography>
                  {(column as any).canFilter ? column.render('Filter') : null}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()} component="div">
        {rows.length > 0 ? (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto', height: `${(windowHeight - 110).toString()}px` }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList height={height} itemCount={rows.length} itemSize={35} width={width}>
                    {RenderRow}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div>
          </div>
        ) : (
          <Typography
            align="center"
            component="div"
            style={{ lineHeight: `${(windowHeight - 110).toString()}px`, color: '#999999' }}
          >
            {loading ? (
              <CircularProgress />
            ) : (state as any).filters.findIndex((x: { id: string }) => x.id === 'logLevel') > -1 ? (
              translations?.noEntriesFilter ? (
                `${(state as any).filters.find((x: { id: string }) => x.id === 'logLevel').value}`
              ) : (
                `No log entries for selected log level : ${
                  (state as any).filters.find((x: { id: string }) => x.id === 'logLevel').value
                }`
              )
            ) : (
              translations?.noEntriesData || 'No log entries'
            )}
          </Typography>
        )}
      </TableBody>
    </MaUTable>
  );
};

const LogList = (props: LogListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timeZone, translations, onReceived } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [logsData, setLogsData] = useState<LogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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

  const columns = useMemo(
    () => [
      {
        header: 'Time',
        accessor: 'dateTime',
      },
      {
        header: 'Level',
        accessor: 'logLevel',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: LevelIconCell,
      },
      {
        header: 'Source',
        accessor: 'source',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        header: 'Text',
        accessor: 'text',
      },
    ],
    [logsData],
  );

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
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} translations={translations} loading={loading} windowHeight={windowHeight} />
    </div>
  );
};

export { LogListProps, LogList };
