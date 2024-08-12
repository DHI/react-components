import {
  EditingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedSorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  Grid,
  TableColumnVisibility,
  TableEditColumn,
  TableFilterRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { createAccount, deleteAccount, fetchAccounts, fetchUserGroups, updateAccount } from '../api';
import {
  Command,
  DefaultColumnsTypeProvider,
  DeleteDialog,
  FilterCellRow,
  filterRules,
  MetadataTypeProvider,
  Popup,
  PopupEditing,
  UsersTypeProvider,
} from '../common/Table';
import { UserGroupProps, UserGroupsData } from '../UserGroups/types';

const DEFAULT_COLUMNS = [
  {
    title: 'Username',
    name: 'id',
  },
  {
    title: 'Name',
    name: 'name',
  },
  {
    title: 'Email',
    name: 'email',
  },
  {
    title: 'User Groups',
    name: 'userGroups',
  },
];

const Accounts: React.FC<UserGroupProps> = ({ host, token, userGroupsDefaultSelected, metadata }) => {
  const [rows, setRows] = useState<UserGroupsData[]>([]);
  const [userGroups, setUserGroups] = useState<Record<string, string>[]>([]);
  const [deletedDialog, setDeletedDialog] = useState(false);
  const [deleteRow, setDeleteRow] = useState({});
  const [filteringColumnExtensions, setFilteringColumnExtensions] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const getRowId = (row) => row.id;

  const metadataHeader = metadata
    ? metadata.reduce(
        (acc, cur) => [
          ...acc,
          {
            title: cur.label,
            type: cur.type,
            name: cur.key,
          },
        ],
        [],
      )
    : [];

  const [columns] = useState(DEFAULT_COLUMNS.concat(metadataHeader));
  const metadataColumnsArray = metadata ? metadata.reduce((acc, cur) => [...acc, cur.key], []) : [];
  const [metadataColumns] = useState<string[]>(metadataColumnsArray);
  const [usersColumn] = useState<string[]>(['userGroups']);
  const [defaultColumnsNameArray] = useState<string[]>(DEFAULT_COLUMNS.map((column) => column.name));

  const fetchData = () => {
    fetchAccounts(host, token).subscribe(
      async (body: Record<any, any>) => {
        setRows(body as any);
      },
      (error) => {
        console.error('AU Error: ', error);
      },
    );

    fetchUserGroups(host, token).subscribe(async (body) => {
      const userGroups = body.map((ug) => ({
        id: ug.id,
        name: ug.name,
      }));
      setUserGroups(userGroups);
    });
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;

    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;

      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      setDeletedDialog(true);
      const deletedSet = new Set(deleted);
      const selectedRow = rows.filter((row) => deletedSet.has(row.id));
      setDeleteRow(selectedRow);

      // return the same rows and let the handleDelete deal with the data, otherwise it will be undefined and crash with no rows
      changedRows = rows;
    }

    setRows(changedRows);
  };

  const handleSubmit = (row, isNew = false) => {
    if (isNew) {
      return createAccount(host, token, { ...row }).subscribe(
        () => {
          fetchData();
        },
        (error) => {
          console.log('Create Account: ', error);
        }
      );
    } else {
      return updateAccount(host, token, { ...row }).subscribe(
        () => {
          fetchData();
        },
        (error) => {
          setError(true);
          setErrorMessage('Passwords must be at least 7 characters');
          console.log('Update Account: ', error);
        }
      );
    }
  };

  const handleDelete = (row) => {
    deleteAccount(host, token, row.id).subscribe(
      () => {
        fetchData();
        setDeletedDialog(false);
      },
      (error) => console.log(error),
    );
  };

  useEffect(() => {
    fetchData();

    if (metadata) {
      setFilteringColumnExtensions(filterRules(metadata));
    }
  }, []);

  return (
    <Paper>
      <DeleteDialog
        selectedRow={deleteRow}
        showDialog={deletedDialog}
        closeDialog={() => setDeletedDialog(false)}
        handleDelete={handleDelete}
      />
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <FilteringState />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />

        <SortingState defaultSorting={[{ columnName: 'name', direction: 'asc' }]} />
        <IntegratedSorting />

        <EditingState onCommitChanges={commitChanges as any} />
        <VirtualTable height={window.innerHeight - 230} />

        <DefaultColumnsTypeProvider for={defaultColumnsNameArray} />
        {metadataColumns && <MetadataTypeProvider for={metadataColumns} />}
        <UsersTypeProvider for={usersColumn} />

        <TableHeaderRow showSortingControls />
        <TableFilterRow cellComponent={FilterCellRow} />

        <TableEditColumn showAddCommand showEditCommand showDeleteCommand commandComponent={Command} />
        <PopupEditing
          popupComponent={Popup}
          title="Accounts"
          allUsers={userGroups || []}
          defaultColumns={DEFAULT_COLUMNS}
          metadata={metadata}
          onSave={handleSubmit}
          hasPassword
          userGroupsDefaultSelected={userGroupsDefaultSelected}
          errorAccount={error}
          errorMessage={errorMessage}
        />
        <Toolbar />
        <TableColumnVisibility />
        <ColumnChooser />
      </Grid>
    </Paper>
  );
};

export { UserGroupProps, Accounts };
