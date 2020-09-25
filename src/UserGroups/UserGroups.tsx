import { Box, Paper } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchUserGroups } from '../DataServices/DataServices';
import DefaultTable from '../Table/Table';
import ChipCell from '../Table/Cells/ChipCell';
import AccountTableHeader from './UserGroupsTableHeader';

const UserGroups = ({ host, token, metadataUserGroups }: UserGroupListProps) => {
  const [userGroups, setUserGroups] = useState<UserGoupsData[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [isAccountDialogOpen, setisAccountDialogOpen] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  const openDialog = () => {
    setisAccountDialogOpen(true);
    setisEditing(true);
  };

  const TableHeaders = useMemo(
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
        Header: 'Users',
        accessor: 'users',
        Cell: ChipCell,
      },
    ],
    [],
  );

  const searchItems = (item: UserGoupsData) => {
    if (filter === '') return true;

    const query = filter.toLowerCase();
    const id = item.id.toLowerCase();
    const name = item.name.toLowerCase();
    const users = item.users.map((ug) => ug.toLowerCase());

    return id.includes(query) || name.includes(query) || users.some((ug) => ug.indexOf(query) >= 0);
  };

  useEffect(() => {
    try {
      fetchUserGroups(host, token).subscribe(async (body: Record<any, any>) => {
        const userGroups = body as UserGroups[];
        //   const accountData = userData.map((u: AccountData) => ({
        //     ...u,
        //     userGroups: userGroups.filter((ug) => ug.users.indexOf(u.id) >= 0).map((ug) => ug.name),
        //   }));

        setUserGroups(userGroups);
      });
      console.log('Fetching');
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error('UG Error: ', error);
    }
  }, []);

  return (
    <>
      <Box>
        <AccountTableHeader filter={filter} setFilter={setFilter} onNew={openDialog} />
        <Paper>
          <DefaultTable
            error={error}
            loading={loading}
            tableHeaders={TableHeaders}
            data={userGroups}
            searchItems={(item) => searchItems(item)}
          />
        </Paper>
      </Box>
    </>
  );
};

export default UserGroups;
