import { Box, CircularProgress, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { green, red, yellow } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { HelpOutline, HourglassEmpty } from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import FilterListIcon from '@material-ui/icons/FilterList';
import { differenceInMinutes } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockLayout, useFilters, useGlobalFilter, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { FilterProps } from '../..';
import { fetchJobs } from '../../DataServices/DataServices';
import JobListProps, { JobData } from './types';

const StatusIconCell = ({ value }: { value: string }) => {
  switch (value) {
    case 'Completed':
      return (
        <Tooltip title={value}>
          <CheckCircleIcon style={{ color: green[300] }} />
        </Tooltip>
      );
    case 'InProgress':
      return (
        <Tooltip title={value}>
          <CircularProgress style={{ color: green[300] }} variant="static" />
        </Tooltip>
      );
    case 'Pending':
      return (
        <Tooltip title={value}>
          <HourglassEmpty style={{ color: yellow[300] }} />
        </Tooltip>
      );
    case 'Error':
      return (
        <Tooltip title={value}>
          <ErrorIcon style={{ color: red[300] }} />
        </Tooltip>
      );
    case 'Cancelled':
      return (
        <Tooltip title={value}>
          <CancelIcon style={{ color: yellow[300] }} />
        </Tooltip>
      );
    case 'Cancel':
      return (
        <Tooltip title="Cancelling">
          <CancelScheduleSendIcon style={{ color: yellow[300] }} />
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

const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }: FilterProps) => {
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

const Table = ({ columns, data }: { columns: any; data: JobData[] }) => {
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
                <Typography noWrap variant="body2" align={(cell.column as any).header === 'Status' ? 'center' : 'left'}>
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

const JobList = (props: JobListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timeZone } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [jobsData, setJobsData] = useState<JobData[]>([]);

  const fetchJobList = (dateTimeValue: string) => {
    console.log(dateTimeValue);
    const query = { since: dateTimeValue };

    fetchJobs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawJobs = res.map((s: { data: JobData }) => {
          s.data.requested = format(utcToZonedTime(s.data.requested, timeZone), dateTimeFormat);
          s.data.started = format(utcToZonedTime(s.data.started, timeZone), dateTimeFormat);
          s.data.finished = format(utcToZonedTime(s.data.finished, timeZone), dateTimeFormat);

          if (s.data.started && s.data.finished) {
            s.data.duration = calcTimeDifference(s.data.started, s.data.finished);
          }

          if (s.data.requested && s.data.started) {
            s.data.delay = calcTimeDifference(s.data.requested, s.data.started);
          }

          return s.data;
        });

        setJobsData(rawJobs.concat(jobsData));

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
    fetchJobList(startTimeUtc);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startDateUtc) {
      interval = setInterval(() => fetchJobList(startDateUtc), frequency * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startDateUtc]);

  const calcTimeDifference = (beginDate: string, endDate: string) => {
    const difference = differenceInMinutes(new Date(endDate), new Date(beginDate));
    const hour = Math.floor(difference / 60);
    const minute = Math.floor(difference - hour * 60);

    if (hour === 0 && minute === 0) {
      return `<1m`;
    } else if (isNaN(difference)) {
      return 'cannot compute';
    } else {
      return `${hour} h ${minute} m`;
    }
  };

  const data = useMemo(() => {
    return jobsData;
  }, [jobsData]);

  const columns = React.useMemo(
    () => [
      {
        header: 'Task Id',
        accessor: 'taskId',
        width: 200,
      },
      {
        header: 'Status',
        accessor: 'status',
        Cell: StatusIconCell,
        Filter: SelectColumnFilter,
        width: 100,
      },
      {
        header: 'Host Id',
        accessor: 'hostId',
        width: 120,
      },
      {
        header: 'Duration',
        accessor: 'duration',
        width: 80,
      },
      {
        header: 'Delay',
        accessor: 'delay',
        width: 80,
      },
      {
        header: 'Requested',
        accessor: 'requested',
        width: 175,
      },
      {
        header: 'Started',
        accessor: 'started',
        width: 175,
      },
      {
        header: 'Finished',
        accessor: 'finished',
        width: 175,
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

export { JobListProps, JobList };
