// eslint-disable-next-line prettier/prettier
import React, { useEffect, useMemo, useState } from 'react';
import {
  createAccount,
  deleteAccount,
  fetchAccounts,
  updateAccount,
  updateUserGroupsForUser,
  fetchUserGroups,
} from '../DataServices/DataServices';
import { Box, Paper } from '@material-ui/core';
import {
  ActionsCell,
  ActionsButtons,
  ChipCell,
  DefaultTable,
  MetadataChipCell,
  Dialog,
  TopTableSection,
} from '../Table';
import AccountsForm from './AccountsForm';

export const Accounts = ({ host, token, metadata }: AccountListProps) => {
  const [data, setData] = useState<AccountData[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AccountData>();

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
    setSelectedUser(item);
  };

  const handleDeleteDialog = (item) => {
    setDeleteDialog(true);
    setisEditing(false);
    setSelectedUser(item);
  };

  const handleDelete = () => {
    deleteAccount(host, token, selectedUser.id).subscribe(
      () => {
        fetchData();
        setDeleteDialog(false);
      },
      (error: any) => console.log(error),
    );
  };

  const fetchData = () =>
    fetchAccounts(host, token).subscribe(
      (users) => {
        const userData = users.map((u: AccountData) => ({
          id: u.id,
          name: u.name,
          email: u.email ? u.email : '',
          metadata: u.metadata ? u.metadata : [],
        }));

        fetchUserGroups(host, token).subscribe(async (body: Record<any, any>) => {
          const userGroups = body as UserGroups[];
          const accountData = userData.map((u: AccountData) => ({
            ...u,
            userGroups: userGroups.filter((ug) => ug.users.indexOf(u.id) >= 0).map((ug) => ug.name),
          }));

          setData(accountData);
        });
      },
      (error) => {
        setError(true);
        setLoading(false);
        console.log('ACC Error: ', error);
      },
    );

  useEffect(() => {
    const subscriber = fetchData();

    return () => {
      if (subscriber !== undefined && subscriber !== null) {
        // console.log('unmount', subscriber);
        subscriber.unsubscribe();
      }
    };
  }, []);

  const handleUserSubmit = (user: EditUser) => {
    if (isEditing) {
      updateAccount(host, token, user).subscribe(
        (updatedUser) => {
          updateUserGroupsForUser(host, token, { groups: user.userGroups, userId: updatedUser.id });
          setIsDialogOpen(false);

          fetchData();
        },
        (error) => {
          setError(true);
          setLoading(false);
          console.log('ACC Submit Error: ', error);

          console.log(error);
        },
      );
    } else {
      createAccount(host, token, user).subscribe(
        (newUser) => {
          updateUserGroupsForUser(host, token, { groups: user.userGroups, userId: newUser.id });

          setIsDialogOpen(false);
          setError(false);

          fetchData();
        },
        (error) => {
          setError(true);
          console.log(error);
        },
      );
    }
  };

  const metadataHeader = metadata
    ? metadata.reduce(
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
      }) => <ActionsCell item={item} onEdit={onEdit} onDelete={handleDeleteDialog} />,
    },
  ];

  const TableHeadersData = useMemo(() => columns.concat(metadataHeader).concat(actions), []);

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

  return (
    <Box>
      <Dialog
        dialogId="user"
        title={isEditing ? 'Edit Account Details' : 'Create New Account'}
        message=""
        showDialog={isDialogOpen}
      >
        <AccountsForm
          token={token}
          host={host}
          onSubmit={handleUserSubmit}
          isEditing={isEditing}
          selectedUser={selectedUser}
          metadata={metadata}
          onCancel={handleDialog}
        />
      </Dialog>

      <Dialog
        dialogId="userDelete"
        title={`Delete ${selectedUser?.name}`}
        message={`This will delete the selected user account ${selectedUser?.name}, after it is deleted you cannot retrieve the data. Are you sure you want to delete this user?`}
        showDialog={deleteDialog}
      >
        <ActionsButtons
          confirmButtonText="Delete"
          isEditing={isEditing}
          onCancel={() => setDeleteDialog(false)}
          onSubmit={handleDelete}
        />
      </Dialog>

      <TopTableSection title="Accounts" filter={filter} setFilter={setFilter} onNew={openDialog} />
      <Paper>
        <DefaultTable
          error={error}
          loading={loading}
          tableHeaders={TableHeadersData}
          data={data}
          searchItems={(item) => searchItems(item)}
        />
      </Paper>
    </Box>
  );
};

export default Accounts;
