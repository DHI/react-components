import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { fetchUserGroups, updateUserGroups, deleteUserGroup, createUserGroup } from '../DataServices/DataServices';
import {
  Dialog,
  ActionsButtons,
  DefaultTable,
  ActionsCell,
  ChipCell,
  MetadataChipCell,
  TopTableSection,
} from '../common/Table';
import UserGroupForm from './UserGroupForm';
import { UserGroupProps, UserGroupsData, UserGroups } from './types';

const UserGroups = ({ host, token, metadata }: UserGroupProps) => {
  const [userGroups, setUserGroups] = useState<UserGroupsData[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [selectedUserGroup, setSelectedUserGroup] = useState<UserGroupsData>();
  const [isTableWider, setIsTableWider] = useState<boolean>(false);

  const openDialog = () => {
    setIsDialogOpen(true);
    setisEditing(false);
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const onEdit = (item) => {
    setIsDialogOpen(true);
    setisEditing(true);
    setSelectedUserGroup(item);
  };

  const handleDeleteDialog = (item) => {
    setDeleteDialog(true);
    setisEditing(false);
    setSelectedUserGroup(item);
  };

  const handleDelete = () => {
    deleteUserGroup(host, token, selectedUserGroup.id).subscribe(
      () => {
        fetchData();
        setDeleteDialog(false);
      },
      (error) => console.log(error),
    );
  };

  const handleSubmit = (user) => {
    const newGroups = [...userGroups];

    for (const key in newGroups) {
      const group = newGroups[key];

      if (group.id === user.id) {
        newGroups[key] = user;
      }
    }

    setUserGroups(newGroups);
    setIsDialogOpen(false);

    return isEditing
      ? (updateUserGroups(host, token, {
          id: user.id,
          name: user.name,
          users: user.users,
          metadata: user.metadata,
        }).subscribe(() => {
          fetchData();
        }),
        (error) => {
          console.log(error);
        })
      : (createUserGroup(host, token, {
          id: user.id,
          name: user.name,
          users: user.users,
          metadata: user.metadata,
        }).subscribe(() => {
          fetchData();
        }),
        (error) => {
          console.log(error);
        });
  };

  const metadataHeader = metadata
    ? metadata.reduce(
        (acc, cur) => [
          ...acc,
          {
            Header: cur.label,
            accessor: `metadata.${cur.key}`,
            Cell: MetadataChipCell(cur),
            flexGrow: isTableWider && 1,
          },
        ],
        [],
      )
    : [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      width: 180,
    },
    {
      Header: 'Name',
      accessor: 'name',
      width: 200,
    },
    {
      Header: 'Users',
      accessor: 'users',
      width: 300,
      Cell: ({ cell: { value } }) => value.join(', '),
    },
  ];

  const actions = [
    {
      Header: 'Actions',
      accessor: 'action',
      width: 90,
      flexGrow: 0,
      Cell: ({
        cell: {
          value: [item],
        },
      }) => <ActionsCell item={item} onEdit={onEdit} onDelete={handleDeleteDialog} />,
    },
  ];

  const TableHeadersData = useMemo(() => columns.concat(metadataHeader).concat(actions), [isTableWider]);

  const searchItems = (item: UserGroupsData) => {
    if (filter === '') return true;

    const query = filter.toLowerCase();
    const id = item.id.toLowerCase();
    const name = item.name.toLowerCase();
    const users = item.users.map((ug) => ug.toLowerCase());

    return id.includes(query) || name.includes(query) || users.some((ug) => ug.indexOf(query) >= 0);
  };

  const fetchData = () => {
    fetchUserGroups(host, token).subscribe(
      async (body: Record<any, any>) => {
        const userGroups = body as UserGroups[];

        setUserGroups(userGroups);
      },
      (error) => {
        setError(true);
        setLoading(false);

        console.error('UG Error: ', error);
      },
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {console.log('isTableWider: ', isTableWider)}
      <Dialog
        dialogId="userGroups"
        title={isEditing ? 'Edit User Group Details' : 'Create New User Group'}
        message=""
        showDialog={isDialogOpen}
      >
        <UserGroupForm
          onSubmit={handleSubmit}
          isEditing={isEditing}
          selectedUserGroup={selectedUserGroup}
          metadata={metadata}
          onCancel={handleDialog}
        />
      </Dialog>

      <Dialog
        dialogId="userGroupsDelete"
        title={`Delete ${selectedUserGroup?.name}`}
        message={`This will delete the selected user account ${selectedUserGroup?.name}, after it is deleted you cannot retrieve the data. Are you sure you want to delete this user?`}
        showDialog={deleteDialog}
      >
        <ActionsButtons
          confirmButtonText="Delete"
          isEditing={isEditing}
          onCancel={() => setDeleteDialog(false)}
          onSubmit={handleDelete}
        />
      </Dialog>

      <TopTableSection title="User Groups" filter={filter} setFilter={setFilter} onNew={openDialog} />
      <Paper>
        <DefaultTable
          error={error}
          loading={loading}
          tableHeaders={TableHeadersData}
          data={userGroups}
          searchItems={(item) => searchItems(item)}
          isTableWiderThanWindow={(wider) => setIsTableWider(wider)}
        />
      </Paper>
    </Box>
  );
};

export { UserGroupProps, UserGroups };
