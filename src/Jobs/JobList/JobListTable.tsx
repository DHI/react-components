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
import JobDetail from './JobDetail';
import { JobData } from './types';

const useStyles = (jobId) =>
  makeStyles((theme: Theme) => ({
    td: {
      flexGrow: '1 !important' as any,
      flexBasis: '5px !important' as any,
      width: 'unset !important' as any,
      maxWidth: 'none !important' as any,
    },
    thead: {
      flexGrow: '1 !important' as any,
      flexBasis: '5px !important' as any,
      width: jobId ? 'auto' : ('unset !important' as any),
      maxWidth: 'none !important' as any,
    },
    tdStatus: {
      marginLeft: theme.spacing(2),
    },
    tdContent: {
      marginLeft: theme.spacing(1),
    },
  }));

const JobListTable = ({
  columns,
  data,
  translations,
  loading,
  hiddenColumns,
  windowHeight,
  isTableWiderThanWindow,
}: {
  columns: any;
  data: JobData[];
  translations: any;
  loading: boolean;
  hiddenColumns: string[];
  windowHeight: number;
  isTableWiderThanWindow: (size: boolean) => void;
}) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    minWidth: 30,
    maxWidth: 1000,
  };

  const [job, setJob] = useState({
    id: '',
    connectionJobLog: '',
  });
  const classes = useStyles(job.id)();

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
      const row = rows[index];

      prepareRow(row);

      return (
        <TableRow
          component="div"
          {...row.getRowProps({
            ...style,
            style: {
              cursor: 'pointer',
            },
          })}
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
    console.log(row.original);

    setJob({
      id: row.original.id,
      connectionJobLog: row.original.connectionJobLog,
    });
  };

  const tableHeaderProps = (props) => {
    const { style } = props;
    const removePx = style.width.substring(0, style.width.length - 2);
    const newWidth = parseInt(removePx);

    return {
      ...props,
      style: {
        ...style,
        overflow: job.id ? 'hidden' : 'visible',
        width: job.id ? newWidth / 2 : newWidth,
      },
    };
  };

  const closeTab = () => {
    setJob({ id: '', connectionJobLog: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1 }}>
        <MaUTable {...getTableProps()} component="div" size="small">
          <TableHead component="div">
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...tableHeaderProps(headerGroup.getHeaderGroupProps())}
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
                        <FixedSizeList height={height} itemCount={rows.length} itemSize={35} width={width}>
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
      {job.id && (
        <div style={{ flex: 1, padding: '1rem' }}>
          <JobDetail detail={job} onClose={closeTab} />
        </div>
      )}
    </div>
  );
};

export default JobListTable;
