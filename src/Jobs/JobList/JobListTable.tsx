import {
  Box,
  CircularProgress,

  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Zoom
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import React, { useCallback, useState } from 'react';
import { useBlockLayout, useFilters, UseFiltersOptions, useGlobalFilter, useTable, UseTableOptions } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { DefaultColumnFilter } from '../../common/tableHelper';
import { fetchLogs } from '../../DataServices/DataServices';
import JobDetail from './JobDetail';
import { jobListTableStyles } from './styles';
import { JobData, JobListTableProps } from './types';


const JobListTable = ({
  token,
  dataSources,
  timeZone,
  dateTimeFormat,
  columns,
  data,
  translations,
  loading,
  isFiltered,
  textareaScrolled,
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
    accountId: '',
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
  const [tableBodyResponsive, setTableBodyResponsive] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  const classes = jobListTableStyles(job?.id, tableBodyResponsive)();

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
          className={classes.row}
          component="div"
          {...row.getRowProps({
            style,
          })}
          selected={job.id === row.original.id}
          onClick={() => expandWithData(row)}
        >
          {row.cells.map((cell) => {
            setTableBodyResponsive((cell.column as any).flexGrow === 1);

            return (
              <TableCell
                {...cell.getCellProps()}
                component="div"
                className={(cell.column as any).flexGrow ? classes.td : ''}
              >
                <Tooltip
                  title={(cell.column as any).category !== 'Status' ? cell.render('Cell') : ''}
                  placement="bottom-start"
                  TransitionComponent={Zoom}
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
                </Tooltip>
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
      accountId = '',
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
      setLoadingDetail(true);
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
            accountId,
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

          setLoadingDetail(false);
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
        {loadingDetail && (
          <div className={classes.loadJobDetail}>
            <CircularProgress />
          </div>
        )}

        <MaUTable {...getTableProps()} component="div" size="small">
          <TableHead component="div">
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...tableExtraProps(headerGroup.getHeaderGroupProps())}
                component="div"
                className={tableBodyResponsive ? classes.td : classes.row}
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
          {isFiltered && (
            <Typography
              align="center"
              component="div"
              style={{ lineHeight: `${(windowHeight - 230).toString()}px`, color: '#999999' }}
            >
              <CircularProgress />
            </Typography>)}
          <TableBody {...getTableBodyProps()} component="div">
            {rows.length > 0 ? (
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '1 1 auto', height: `${(windowHeight - 170).toString()}px` }}>
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
                      `${translations.noEntriesFilter} : ${(state as any).filters.find((x: { id: string }) => x.id === 'status').value
                      }`
                    ) : (
                        `No job entries for selected job status : ${(state as any).filters.find((x: { id: string }) => x.id === 'status').value
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
        <JobDetail detail={job} textareaScrolled={textareaScrolled} timeZone={timeZone} dateTimeFormat={dateTimeFormat} onClose={closeTab} />
      </div>
    </div>
  );
};

export default JobListTable;
