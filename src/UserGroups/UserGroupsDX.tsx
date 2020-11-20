import { DataTypeProvider, DataTypeProviderProps, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,


  TableEditColumn,

  TableHeaderRow, VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { Command, Popup, PopupEditing } from '../common/DevExpress';
import { fetchAccounts, fetchUserGroups } from '../DataServices/DataServices';
import { UserGroupProps, UserGroups, UserGroupsData } from './types';

const DEFAULT_COLUMNS = [
  {
    title: 'Name',
    name: 'name',
  },
  {
    title: 'Users',
    name: 'users',
  },
];

const UserGroupsDX: React.FC<UserGroupProps> = ({ host, token, metadata }) => {

  const [rows, setRows] = useState<UserGroupsData[]>([]);
  const [users, setUsers] = useState<string[]>([]);


  const getRowId = row => row.id;


  const metadataHeader = metadata
    ? metadata.reduce(
      (acc, cur) => [
        ...acc,
        {
          title: cur.label,
          type: cur.type,
          name: `metadata.${cur.key}`,
        },
      ],
      [],
    )
    : [];

  // const columns = DEFAULT_COLUMNS.concat(metadataHeader);
  const [columns] = useState(DEFAULT_COLUMNS.concat(metadataHeader))

  const fetchData = () => {
    fetchUserGroups(host, token).subscribe(
      async (body: Record<any, any>) => {
        const userGroups = body as UserGroups[];
        setRows(userGroups);
      },
      (error) => {
        console.error('UG Error: ', error);
      },
    );

    fetchAccounts(host, token).subscribe(
      async (body: Record<any, any>) => {
        const usersOnly = body.map((item) => item.id);
        setUsers(usersOnly);
      },
      (error) => {
        console.error('UGU Error: ', error);
      },
    );
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
      console.log(changed)
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }

    setRows(changedRows);
  };

  const [usersColumn] = React.useState<string[]>(['users']);
  const UsersFormatter = ({ value }) => (value.join(', '));
  const UsersTypeProvider: React.ComponentType<DataTypeProviderProps> = (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={UsersFormatter}
      {...props}
    />
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        {console.log(columns)}
        {console.log(rows)}
        <EditingState
          onCommitChanges={commitChanges as any}
        />
        <VirtualTable height={window.innerHeight - 230} />
        <UsersTypeProvider for={usersColumn} />
        <TableHeaderRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
        />
        <PopupEditing popupComponent={Popup} title='User Groups' allUsers={users || []} />
      </Grid>
    </Paper>
  );
}

export { UserGroupProps, UserGroupsDX };
