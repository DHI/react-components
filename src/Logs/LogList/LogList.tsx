import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
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
import { useBlockLayout, useFilters, useGlobalFilter, useTable } from 'react-table';
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

const Table = ({ columns, data }: { columns: any; data: LogData[] }) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    minWidth: 30,
    maxWidth: 1000,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, totalColumnsWidth } = useTable(
    {
      columns,
      data,
      defaultColumn,
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
        <FixedSizeList height={345} itemCount={rows.length} itemSize={35} width={totalColumnsWidth}>
          {RenderRow}
        </FixedSizeList>
      </TableBody>
    </MaUTable>
  );
};

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

  const data = useMemo(() => {
    return logsData;
  }, [logsData]);

  const columns = React.useMemo(
    () => [
      {
        header: 'Time',
        accessor: 'dateTime',
        width: 180,
      },
      {
        header: 'Level',
        accessor: 'logLevel',
        width: 110,
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: LevelIconCell,
      },
      {
        header: 'Source',
        accessor: 'source',
        width: 210,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        header: 'Text',
        accessor: 'text',
        width: 500,
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
