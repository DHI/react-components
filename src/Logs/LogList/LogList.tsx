import { Box, CircularProgress, IconButton, Input, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { blueGrey, red, yellow } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { HelpOutline } from '@material-ui/icons';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAsyncDebounce, useFilters, useFlexLayout, useGlobalFilter, useTable } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { fetchLogs } from '../../DataServices/DataServices';
import LogListProps, { BaseFilter, LogData } from './types';

const LevelIconCell = ({ value }: { value: string }) => {
  switch (value) {
    case 'Debug':
      return (
        <Tooltip title="Debug">
          <BugReportOutlinedIcon style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Information':
      return (
        <Tooltip title="Information">
          <InfoOutlinedIcon style={{ color: blueGrey[500] }} />
        </Tooltip>
      );
    case 'Error':
      return (
        <Tooltip title="Error">
          <ErrorOutlineOutlinedIcon style={{ color: red[900] }} />
        </Tooltip>
      );
    case 'Warning':
      return (
        <Tooltip title="Warning">
          <WarningOutlinedIcon style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Critical':
      return (
        <Tooltip title="Critical">
          <NewReleasesIcon style={{ color: red[900] }} />
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

const DefaultColumnFilter = () => {
  return null;
};

const getColumnWidth = (data: LogData[], accessor: string, headerText: string) => {
  if (data.length > 0) {
    const spacing = 10;
    const cellLength = Math.max(...data.map((row) => (`${row[accessor]}` || '').length), headerText.length);

    return cellLength * spacing;
  } else {
    return 150;
  }
};

const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }: BaseFilter) => {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    setAnchorEl(null);
    setFilter(option);
  };

  return (
    <div>
      <Tooltip title="Filter list">
        <IconButton aria-label="Filter list" size={'small'} onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          selected={!filterValue}
          key={-1}
          onClick={() => {
            handleMenuItemClick('');
          }}
        >
          All
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={option === filterValue}
            onClick={() => {
              handleMenuItemClick(option as string);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box display="flex" flexDirection="row">
      <Typography variant="subtitle1" style={{ marginTop: '2px' }}>
        Search : {''}
      </Typography>
      &nbsp;
      <Input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records`}
      />
    </Box>
  );
};

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
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
    },
    useFlexLayout,
    useFilters,
    useGlobalFilter,
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
                <Typography noWrap variant="body2" align={(cell.column as any).header === 'Level' ? 'center' : 'left'}>
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
          <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()} component="div">
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
            <div style={{ flex: '1 1 auto', height: `${(windowHeight - 90).toString()}px` }}>
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
            style={{ lineHeight: `${(windowHeight - 90).toString()}px`, color: '#999999' }}
          >
            {loading ? (
              <CircularProgress />
            ) : (state as any).filters.findIndex((x: { id: string }) => x.id === 'logLevel') > -1 ? (
              translations.noEntriesFilter ? (
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
        width: getColumnWidth(data, 'dateTime', 'Time'),
      },
      {
        header: 'Level',
        accessor: 'logLevel',
        width: getColumnWidth(data, 'logLevel', 'Level'),
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: LevelIconCell,
      },
      {
        header: 'Source',
        accessor: 'source',
        width: getColumnWidth(data, 'source', 'Source'),
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        header: 'Text',
        accessor: 'text',
        width: getColumnWidth(data, 'text', 'Text'),
      },
    ],
    [logsData],
  );

  const fetchLogsList = (dateTimeValue: string) => {
    setLoading(true);
    console.log(dateTimeValue);
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
    let interval: NodeJS.Timeout;

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
