import { Box, CircularProgress, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';
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
import { useBlockLayout, useFilters, UseFiltersOptions, useGlobalFilter, useTable, UseTableOptions } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { FilterProps } from '../..';
import { fetchJobs } from '../../DataServices/DataServices';
import JobListProps, { JobData } from './types';

const StatusIconCell = ({ value, cell }: { value: string; cell: any }) => {
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
          <Box position="relative" display="inline-flex">
            <CircularProgress style={{ color: blue[900] }} variant={'indeterminate'} size={28} thickness={4} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                style={{ fontSize: 10 }}
              >{`${cell.row.original.progress}%`}</Typography>
            </Box>
          </Box>
        </Tooltip>
      );
    case 'Pending':
      return (
        <Tooltip title={value}>
          <HourglassEmpty style={{ color: yellow[900] }} />
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
          <CancelIcon style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Cancelling':
    case 'Cancel':
      return (
        <Tooltip title={value}>
          <CancelScheduleSendIcon style={{ color: yellow[900] }} />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={value}>
          <HelpOutline style={{ color: yellow[900] }} />
        </Tooltip>
      );
  }
};

const DefaultColumnFilter = () => {
  return null;
};

const getColumnWidth = (data: JobData[], accessor: string, headerText: string, minWidth: number) => {
  if (data.length > 0) {
    const spacing = 10;
    const cellLength = Math.max(...data.map((row) => (`${row[accessor]}` || '').length), headerText.length);

    return Math.max(minWidth, cellLength * spacing);
  } else {
    return minWidth;
  }
};

const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }: FilterProps) => {
  const options = useMemo(() => {
    const options = new Set<any>();

    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });

    return [...Array.from(options.values())];
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

const Table = ({
  columns,
  data,
  translations,
  loading,
  hiddenColumns,
  windowHeight,
}: {
  columns: any;
  data: JobData[];
  translations: any;
  loading: boolean;
  hiddenColumns: string[];
  windowHeight: number;
}) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    minWidth: 30,
    maxWidth: 1000,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, totalColumnsWidth, state } = useTable(
    {
      autoResetFilters: false,
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    } as UseTableOptions<JobData> & UseFiltersOptions<JobData>,
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
                {(cell.column as any).header === 'Status' ? (
                  <Typography align="center" component="div">
                    {cell.render('Cell')}
                  </Typography>
                ) : (
                  <Typography noWrap variant="body2">
                    {cell.render('Cell')}
                  </Typography>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
    [prepareRow, rows],
  );

  return (
    <MaUTable {...getTableProps()} component="div" size="small">
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
        {rows.length > 0 ? (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto', height: `${(windowHeight - 60).toString()}px` }}>
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
            style={{ lineHeight: `${(windowHeight - 60).toString()}px`, color: '#999999' }}
          >
            {loading ? (
              <CircularProgress />
            ) : (state as any).filters.findIndex((x: { id: string }) => x.id === 'status') > -1 ? (
              translations.noEntriesFilter ? (
                `${(state as any).filters.find((x: { id: string }) => x.id === 'status').value}`
              ) : (
                `No job entries for selected job status : ${
                  (state as any).filters.find((x: { id: string }) => x.id === 'status').value
                }`
              )
            ) : (
              translations?.noEntriesData || 'No job entries'
            )}
          </Typography>
        )}
      </TableBody>
    </MaUTable>
  );
};

const JobList = (props: JobListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timeZone, translations, onReceived } = props;
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [jobsData, setJobsData] = useState<JobData[]>([]);
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

  const onJobsRecieved = (data: JobData[]) => {
    return data.reduce(function (obj, v) {
      obj[v.status] = (obj[v.status] || 0) + 1;

      return obj;
    }, {});
  };

  const data = useMemo(() => {
    setLoading(false);

    if (onReceived) {
      onReceived(onJobsRecieved(jobsData));
    }

    return jobsData;
  }, [jobsData]);

  const columns = [
    {
      header: 'Task Id',
      accessor: 'taskId',
      Filter: SelectColumnFilter,
      width: 250,
    },
    {
      header: 'Status',
      accessor: 'status',
      Cell: StatusIconCell,
      Filter: SelectColumnFilter,
      width: 80,
    },
    {
      header: 'Host Id',
      accessor: 'hostId',
      Filter: SelectColumnFilter,
      width: 125,
    },
    {
      header: 'Duration',
      accessor: 'duration',
      width: 80,
    },
    {
      header: 'Delay',
      accessor: 'delay',
      width: 70,
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
  ];

  const fetchJobList = (dateTimeValue: string) => {
    setLoading(true);
    console.log(dateTimeValue);
    const query = { since: dateTimeValue };
    const oldJobsData = jobsData;

    fetchJobs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawJobs = res.map((s: { data }) => {
          // Mapping to JobData.
          const dataMapping = {
            id: s.data.Id,
            taskId: s.data.TaskId,
            hostId: s.data.HostId,
            status: s.data.Status,
            progress: s.data.Progress || 0,
            requested: s.data.Requested
              ? format(utcToZonedTime(s.data.Requested.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            started: s.data.Started
              ? format(utcToZonedTime(s.data.Started.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            finished: s.data.Finished
              ? format(utcToZonedTime(s.data.Finished.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            duration: calcTimeDifference(s.data.Started, s.data.Finished),
            delay: calcTimeDifference(s.data.Requested, s.data.Started),
          };

          const duplicateIndex = oldJobsData.findIndex((x: { id: string }) => x.id === s.data.Id);

          // Remove duplicate data
          if (duplicateIndex > -1) {
            oldJobsData.splice(duplicateIndex, 1);
          }

          return dataMapping;
        });
        setJobsData(rawJobs.concat(oldJobsData));

        const utcDate = zonedTimeToUtc(new Date(), timeZone);
        const utcDateFormated = utcDate.toISOString().split('.').shift().replace(':', '');
        const fixedUtcDateFormated = utcDateFormated.replace(':', '');

        setStartDateUtc(fixedUtcDateFormated);
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
      return '';
    } else {
      return `${hour}h ${minute}m`;
    }
  };

  /** Function and variable to select display column */
  // const [open, setOpen] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  const hiddenColumnsData = useMemo(() => {
    return hiddenColumns;
  }, [hiddenColumns]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.checked) {
  //     setHiddenColumns([...hiddenColumns, event.target.name]);
  //   } else {
  //     setHiddenColumns(hiddenColumns.filter((e) => e !== event.target.name));
  //   }
  // };

  return (
    <div>
      <CssBaseline />
      {/* Button and dialog to select display column */}
      {/* <Typography align="left" component="div" style={{ marginBottom: '10px', marginTop: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#0D3958' }}
          startIcon={<MenuIcon />}
          onClick={handleClickOpen}
        >
          <span>Select columns</span>
        </Button>
      </Typography>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Select column to display</DialogTitle>
        {columns.map((column, index) => (
          <FormControlLabel
            style={{ marginLeft: '10px' }}
            key={column.header}
            control={
              <Checkbox
                key={column.header}
                checked={hiddenColumnsData.indexOf(column.accessor) < 0}
                name={column.accessor}
                onChange={handleOnChange}
              />
            }
            label={column.header}
          />
        ))}
      </Dialog> */}
      <Table
        columns={columns}
        data={data}
        translations={translations}
        loading={loading}
        hiddenColumns={hiddenColumnsData}
        windowHeight={windowHeight}
      />
    </div>
  );
};

export { JobListProps, JobList };
