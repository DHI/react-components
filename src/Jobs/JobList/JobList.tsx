import {
  Box,
  CircularProgress,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';
import MaUTable from '@material-ui/core/Table';
import {
  Cancel,
  CancelScheduleSend,
  CheckCircle,
  Error,
  FilterList,
  HelpOutline,
  HourglassEmpty,
} from '@material-ui/icons';
import { differenceInMinutes } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockLayout, useFilters, UseFiltersOptions, useGlobalFilter, useTable, UseTableOptions } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { FilterProps } from '../..';
import { fetchJobs } from '../../DataServices/DataServices';
import JobListProps, { JobData } from './types';
import { DefaultColumnFilter, SelectColumnFilter } from '../../common/tableHelper';

const StatusIconCell = ({ value, cell }: { value: string; cell: any }) => {
  switch (value) {
    case 'Completed':
      return (
        <Tooltip title={value}>
          <CheckCircle style={{ color: green[300] }} />
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
          <Error style={{ color: red[300] }} />
        </Tooltip>
      );
    case 'Cancelled':
      return (
        <Tooltip title={value}>
          <Cancel style={{ color: yellow[900] }} />
        </Tooltip>
      );
    case 'Cancelling':
    case 'Cancel':
      return (
        <Tooltip title={value}>
          <CancelScheduleSend style={{ color: yellow[900] }} />
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
                `${translations.noEntriesFilter} : ${
                  (state as any).filters.find((x: { id: string }) => x.id === 'status').value
                }`
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
    const query = { since: dateTimeValue };
    const oldJobsData = jobsData;

    fetchJobs(dataSources, token, query).subscribe(
      (res) => {
        console.log(res);
        const rawJobs = res.map((s: { data }) => {
          // Mapping to JobData.
          const dataMapping = {
            id: s.data.id,
            taskId: s.data.taskId,
            hostId: s.data.hostId,
            status: s.data.status,
            progress: s.data.progress || 0,
            requested: s.data.requested
              ? format(utcToZonedTime(s.data.requested.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            started: s.data.started
              ? format(utcToZonedTime(s.data.started.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            finished: s.data.finished
              ? format(utcToZonedTime(s.data.finished.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            duration: calcTimeDifference(s.data.started, s.data.finished),
            delay: calcTimeDifference(s.data.requested, s.data.started),
          };

          const duplicateIndex = oldJobsData.findIndex((x: { id: string }) => x.id === s.data.Id);

          // Remove duplicate data
          if (duplicateIndex > -1) {
            oldJobsData.splice(duplicateIndex, 1);
          }

          return dataMapping;
        });
        setJobsData(rawJobs.concat(oldJobsData));

        const utcDate = zonedTimeToUtc(new Date(), timeZone).toISOString();

        setStartDateUtc(utcDate);
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
    let interval: any;

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
