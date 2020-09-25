import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { useTable, UseTableOptions } from 'react-table';

const DefaultTable = ({
  error,
  loading,
  tableHeaders,
  data,
  searchItems,
  HeaderCellProps,
  RowProps,
}: DefaultTableProps) => {
  const noResults = () => {
    if (error) return <Typography>Error fetching users...</Typography>;
    if (loading) return <CircularProgress />;

    return <Typography>No records to display.</Typography>;
  };

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns: tableHeaders,
    data: data.filter(searchItems).map((item) => ({
      ...item,
      action: [item],
    })),
  } as UseTableOptions<TableData>);

  return (
    <Table {...getTableProps()} size="small">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps(HeaderCellProps())}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row) => {
            prepareRow(row);

            return (
              <TableRow {...row.getRowProps(RowProps())}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell style={{ textAlign: 'center' }} colSpan={9}>
              {noResults()}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DefaultTable;
