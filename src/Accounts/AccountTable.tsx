import React, { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { get, isEmpty } from 'lodash';
import { Column, TableRowProps, useTable, UseTableOptions, TableCellProps } from 'react-table';
import ChipCell from './Cells/ChipCell';
import ActionsCell from './Cells/ActionsCell';
import AccountTableHeader from './AccountTableHeader';

const AccountTable = ({ error, loading, users, onNew, onEdit, onDelete }: AccountTableProps) => {
  const [filter, setFilter] = useState('');
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'User Groups',
        accessor: 'userGroups',
        Cell: ChipCell,
      },
      {
        Header: 'Actions',
        accessor: 'action',
        Cell: ({
          cell: {
            value: [item],
          },
        }) => <ActionsCell item={item} onEdit={onEdit} onDelete={onDelete} />,
      },
    ],
    [],
  );

  const searchItems = (item: AccountData) => {
    if (filter === '') return true;

    const query = filter.toLowerCase();
    const id = item.id.toLowerCase();
    const name = item.name.toLowerCase();
    const email = item.email.toLowerCase();
    const userGroups = item.userGroups.map((ug) => ug.toLowerCase());

    return (
      id.includes(query) ||
      name.includes(query) ||
      email.includes(query) ||
      userGroups.some((ug) => ug.indexOf(query) >= 0)
    );
  };

  const getHeaderCellProps = (): Partial<TableCellProps> => ({
    style: { fontWeight: 'bold' },
  });
  const getRowProps = (): Partial<TableRowProps> => ({
    style: { background: '' },
  });

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: users.filter(searchItems).map((item) => ({
      ...item,
      action: [item],
    })),
  } as UseTableOptions<AccountData>);

  return (
    <Box>
      <AccountTableHeader filter={filter} setFilter={setFilter} onNew={onNew} />
      <Paper>
        <Table {...getTableProps()} size="small">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps(getHeaderCellProps())}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);

                return (
                  <TableRow {...row.getRowProps(getRowProps())}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell style={{ textAlign: 'center' }} colSpan={9}>
                  {loading && users.length === 0 && <CircularProgress />}
                  {error && users.length === 0 && <Typography>Error fetching users...</Typography>}
                  {!loading && !error && users.length === 0 && <Typography>No records to display.</Typography>}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AccountTable;