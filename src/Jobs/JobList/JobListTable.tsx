import {
  Box,
  CircularProgress,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import React, { useCallback, useState } from 'react';
import { useBlockLayout, useFilters, UseFiltersOptions, useGlobalFilter, useTable, UseTableOptions } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { DefaultColumnFilter } from '../../common/tableHelper';
import { fetchLogs } from '../../DataServices/DataServices';
import JobDetail from './JobDetail';
import { JobData, JobListTableProps } from './types';

const useStyles = (jobId) =>
  makeStyles((theme: Theme) => ({
    td: {
      flexGrow: '1 !important' as any,
      flexBasis: '5px !important' as any,
      width: 'unset !important' as any,
      maxWidth: 'none !important' as any,
    },
    thead: {
      'flexGrow': '1 !important' as any,
      'flexBasis': '5px !important' as any,
      'width': 'unset !important' as any,
      'maxWidth': 'none !important' as any,
      '&.Mui-selected': {
        'backgroundColor': theme.palette.action.selected,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
    tdStatus: {
      marginLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    tdContent: {
      marginLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    jobDetail: {
      padding: '1rem 2rem',
      position: 'absolute',
      background: '#FFF',
      top: 0,
      bottom: 0,
      right: 0,
      width: '50%',
      transition: 'all, .5s',
      transform: jobId ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
      boxShadow: jobId ? '-20px 0px 19px -12px rgba(0,0,0,0.3)' : 'none',
    },
  }));

const JobListTable = ({
  token,
  dataSources,
  timeZone,
  dateTimeFormat,
  columns,
  data,
  translations,
  loading,
  hiddenColumns,
  windowHeight,
  isTableWiderThanWindow,
}: JobListTableProps) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    minWidth: 30,
    maxWidth: 1000,
  };

  const initialJobData = {
    id: '',
    taskId: '',
    status: '',
    hostId: '',
    duration: '',
    delay: '',
    requested: '',
    started: '',
    finished: '',
    progress: 0,
    connectionJobLog: '',
  };

  const [job, setJob] = useState<JobData>(initialJobData);
  const classes = useStyles(job?.id)();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
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
      style.cursor = 'pointer';
      const row = rows[index];

      prepareRow(row);

      return (
        <TableRow
          className={classes.thead}
          component="div"
          {...row.getRowProps({
            style,
          })}
          selected={job.id === row.original.id}
          onClick={() => expandWithData(row)}
        >
          {row.cells.map((cell) => {
            return (
              <TableCell
                {...cell.getCellProps()}
                component="div"
                className={(cell.column as any).flexGrow ? classes.td : ''}
              >
                {(cell.column as any).header === 'Status' ? (
                  <Typography
                    className={classes.tdStatus}
                    component="div"
                    style={
                      (cell.column as any).header === 'Task Id'
                        ? { width: 'auto' }
                        : { width: cell.column.width || cell.column.minWidth }
                    }
                  >
                    {cell.render('Cell')}
                  </Typography>
                ) : (
                  <Typography
                    noWrap
                    className={classes.tdContent}
                    style={{ width: cell.column.width || cell.column.minWidth }}
                    variant="body2"
                  >
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

  const getTableWidth = (width: number) => {
    const columnWidthSum = [];
    const columnsInfo = headerGroups.map((column) => column.headers);
    columnsInfo.map((item) => item.map((item) => columnWidthSum.push(item.width)));
    const tableWidth = columnWidthSum.reduce((acc, cur) => acc + cur);
    isTableWiderThanWindow(width > tableWidth);
  };

  const expandWithData = (row) => {
    const {
      id = '',
      taskId = '',
      status = '',
      hostId = '',
      duration = '',
      delay = '',
      requested = '',
      started = '',
      finished = '',
      progress = 0,
      connectionJobLog = '',
    } = row.original;

    if (job.id === id) {
      setJob(initialJobData);
    } else {
      const query = [
        {
          Item: 'Tag',
          Value: id,
          QueryOperator: 'Equal',
        },
      ];

      const sources = dataSources.map((item) => ({
        host: item.host,
        connection: item.connectionJobLog,
      }));

      fetchLogs(sources, token, query).subscribe(
        (res) => {
          const logs = res.map((item) => item.data);

          setJob({
            id,
            taskId,
            status,
            hostId,
            duration,
            delay,
            requested,
            started,
            finished,
            progress,
            connectionJobLog,
            logs,
          });
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const tableExtraProps = (props) => {
    const { style } = props;

    return {
      ...props,
      style: {
        ...style,
        cursor: 'pointer',
      },
    };
  };

  const closeTab = () => {
    setJob(initialJobData);
  };

  return (
    <div style={{ display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1 }}>
        <MaUTable {...getTableProps()} component="div" size="small">
          <TableHead component="div">
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...tableExtraProps(headerGroup.getHeaderGroupProps())}
                component="div"
                className={classes.thead}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    component="div"
                    className={(column as any).flexGrow ? classes.td : ''}
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
                <div style={{ flex: '1 1 auto', height: `${(windowHeight - 130).toString()}px` }}>
                  <AutoSizer>
                    {({ height, width }) => {
                      getTableWidth(width);

                      return (
                        <FixedSizeList height={height} itemCount={rows.length} itemSize={50} width={width}>
                          {RenderRow}
                        </FixedSizeList>
                      );
                    }}
                  </AutoSizer>
                </div>
              </div>
            ) : (
              <Typography
                align="center"
                component="div"
                style={{ lineHeight: `${(windowHeight - 130).toString()}px`, color: '#999999' }}
              >
                {loading ? (
                  <CircularProgress />
                ) : (state as any).filters.findIndex((x: { id: string }) => x.id === 'status') > -1 ? (
                  translations?.noEntriesFilter ? (
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
      </div>

      <div className={classes.jobDetail}>
        <JobDetail detail={job} timeZone={timeZone} dateTimeFormat={dateTimeFormat} onClose={closeTab} />
      </div>
    </div>
  );
};

export default JobListTable;
