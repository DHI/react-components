import {
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Tooltip,
  Typography,
  Zoom,
} from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TableCellProps, TableRowProps, useBlockLayout, useTable, UseTableOptions } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { DefaultTableProps, TableData } from './types';

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

const BUFFER = 50;

const DefaultTable = ({
  error,
  loading,
  tableHeaders,
  data,
  searchItems,
  isTableWiderThanWindow,
  hasHeader,
}: DefaultTableProps) => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const classes = useStyles();

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const noResults = () => {
    if (error) return <Typography>Error fetching users...</Typography>;
    if (loading) return <CircularProgress />;

    return <Typography>No records to display.</Typography>;
  };

  const getHeaderCellProps = (): Partial<TableCellProps> => ({
    style: { fontWeight: 'bold' },
  });
  const getRowProps = (style): Partial<TableRowProps> => ({
    style: { ...style, background: '' },
  });

  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow } = useTable(
    {
      columns: tableHeaders,
      data: data.filter(searchItems).map((item) => ({
        ...item,
        action: [item],
      })),
      defaultColumn,
    } as UseTableOptions<TableData>,
    useBlockLayout,
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);

      return (
        <TableRow component="div" {...row.getRowProps(getRowProps(style))}>
          {row.cells.map((cell) => {
            return (
              <TableCell
                {...cell.getCellProps()}
                component="div"
                className={(cell.column as any).flexGrow ? classes.td : ''}
              >
                <Tooltip
                  title={
                    (cell.column as any).category !== 'Boolean' && (cell.column as any).category !== 'Action'
                      ? cell.render('Cell')
                      : ''
                  }
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  {(cell.column as any).Header === 'Actions' ? (
                    <Typography component="span">{cell.render('Cell')}</Typography>
                  ) : (
                    <Typography noWrap variant="body2" className={classes.tdContent}>
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
    isTableWiderThanWindow(width > totalColumnsWidth);
  };

  const getTableOutterSpace = () => {
    const tableHeader = document.getElementsByClassName('TableHeader');
    const tableHeaderHeight = (tableHeader[0] as any).offsetHeight || 0;
    const TopTableSection = document.getElementsByClassName('TopTableSection');
    const TopTableSectionHeight = (TopTableSection[0] as any).offsetHeight || 0;
    const headerHeight = hasHeader ? 64 : 0;

    return tableHeaderHeight + headerHeight * 2 + TopTableSectionHeight + BUFFER;
  };

  return (
    <Table {...getTableProps()} className="Table" component="div">
      <TableHead className="TableHeader" component="div">
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} component="div" className={classes.td}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...column.getHeaderProps(getHeaderCellProps())}
                component="div"
                className={(column as any).flexGrow ? classes.td : ''}
              >
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()} style={{ display: 'flex' }} component="div" className="TableBody">
        {rows.length > 0 ? (
          <AutoSizer style={{ flex: '1 1 auto', height: `${(windowHeight - getTableOutterSpace()).toString()}px` }}>
            {({ height, width }) => {
              getTableWidth(width);

              return (
                <FixedSizeList height={height} itemCount={rows.length} itemSize={60} width={width}>
                  {RenderRow}
                </FixedSizeList>
              );
            }}
          </AutoSizer>
        ) : (
          <TableRow component="div">
            <TableCell component="div" style={{ textAlign: 'center' }} colSpan={9}>
              {noResults()}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DefaultTable;
