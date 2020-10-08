import React, { useCallback } from 'react';
import {
  Box,
  CircularProgress,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import { useBlockLayout, useFilters, UseFiltersOptions, useGlobalFilter, useTable, UseTableOptions } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DefaultColumnFilter } from '../../common/tableHelper';
import { FixedSizeList } from 'react-window';
import { JobData } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  td: {
    flexGrow: '1 !important' as any,
    flexBasis: '5px !important' as any,
    width: 'unset !important' as any,
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

  const classes = useStyles();
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
            style,
          })}
        >
          {row.cells.map((cell) => {
            return (
              <TableCell
                {...cell.getCellProps()}
                component="div"
                className={
                  (cell.column as any).flexGrow ? `table-cell-responsive-${(cell.column as any).flexGrow}` : ''
                }
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

  return (
    <MaUTable {...getTableProps()} component="div" size="small">
      <TableHead component="div">
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} component="div" className={classes.td}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...column.getHeaderProps()}
                component="div"
                className={(column as any).flexGrow ? `table-cell-responsive-${(column as any).flexGrow}` : ''}
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
  );
};

export default JobListTable;
