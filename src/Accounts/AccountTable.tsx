import React, { useMemo, useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { TableRowProps, TableCellProps } from 'react-table';
import ChipCell, { MetadataChipCell } from '../Table/Cells/ChipCell';
import ActionsCell from '../Table/Cells/ActionsCell';
import AccountTableHeader from './AccountTableHeader';
import DefaultTable from '../Table';

const AccountTable = ({ error, loading, users, metadataAccounts, onNew, onEdit, onDelete }: AccountTableProps) => {
  const [filter, setFilter] = useState('');
  const metadataHeader = metadataAccounts
    ? metadataAccounts.reduce(
        (acc, cur) => [
          ...acc,
          {
            Header: cur.label,
            accessor: `metadata.${cur.key}`,
            Cell: MetadataChipCell(cur),
          },
        ],
        [],
      )
    : [];

  const columns = [
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
  ];

  const actions = [
    {
      Header: 'Actions',
      accessor: 'action',
      Cell: ({
        cell: {
          value: [item],
        },
      }) => <ActionsCell item={item} onEdit={onEdit} onDelete={onDelete} />,
    },
  ];

  const newHeaders = useMemo(() => columns.concat(metadataHeader).concat(actions), []);

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

  return (
    <Box>
      <AccountTableHeader filter={filter} setFilter={setFilter} onNew={onNew} />
      <Paper>
        <DefaultTable
          error={error}
          loading={loading}
          tableHeaders={newHeaders}
          data={users}
          searchItems={(item) => searchItems(item)}
          HeaderCellProps={() => getHeaderCellProps()}
          RowProps={() => getRowProps()}
        />
      </Paper>
    </Box>
  );
};

export default AccountTable;
