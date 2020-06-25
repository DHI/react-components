import React, { useCallback, useEffect, useState } from 'react';
import MaterialTable, { Icons } from 'material-table';
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

import AccountModel from './AccountModel';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core';

import { fetchAccounts, updateAccount, createAccount, deleteAccount } from '../DataServices/DataServices';

const tableIcons = {
  Add: AddBox,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Export: SaveAlt,
  Filter: FilterList,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  Edit,
  FirstPage,
  LastPage,
  Search,
  Check,
  Clear,
  ViewColumn,
} as Icons;

export const Accounts = ({ host, token }: { host: string; token: string }) => {
  const [state, setState] = useState({
    data: [] as any[],
    dialogTitle: '',
    dialogMessage: '',
    editing: false,
    showDialog: false,
    showModal: false,
    selectedUser: {
      id: '',
      name: '',
      email: '',
      roles: '',
    },
  });

  const fetchData = useCallback(
    () =>
      fetchAccounts(host, token).subscribe(
        (users) => {
          setState({
            ...state,
            data: users.map((u: any) => ({
              id: u.id,
              name: u.name,
              email: u.email ? u.email : '',
              roles: u.roles,
            })),
          });
        },
        (error) => console.log(error),
      ),
    [state.data],
  );

  useEffect(() => {
    const subscriber = fetchData();

    return () => {
      if (subscriber !== undefined && subscriber !== null) {
        // console.log('unmount', subscriber);
        subscriber.unsubscribe();
      }
    };
  }, [state.data.length]);

  const handleSubmit = (userDetails: any) => {
    if (state.editing) {
      updateAccount(host, token, userDetails).subscribe(
        (updatedUser) =>
          setState({
            ...state,
            data: [...state.data, updatedUser] as any,
            showModal: false,
            editing: false,
            selectedUser: {
              id: '',
              name: '',
              email: '',
              roles: '',
            },
          }),
        (error) => console.log(error),
      );
    } else {
      createAccount(host, token, userDetails).subscribe(
        (newUser) =>
          setState({
            ...state,
            data: [...state.data, newUser] as any,
            editing: false,
            showModal: false,
            selectedUser: {
              id: '',
              name: '',
              email: '',
              roles: '',
            },
          }),
        (error) => console.log(error),
      );
    }
  };

  const toggleModal = (rowData?: any, editing = false) => () => {
    setState({
      ...state,
      editing,
      showModal: !state.showModal,
      selectedUser:
        rowData !== null && editing
          ? rowData
          : {
              id: '',
              name: '',
              email: '',
              roles: '',
            },
    });
  };

  const toggleDialog = (rowData: any, action: any) => () => {
    switch (action) {
      case 'close':
        setState({
          ...state,
          showDialog: !state.showDialog,
        });

        break;
      case 'delete':
        setState({
          ...state,
          dialogTitle: `Delete ${rowData.name}`,
          dialogMessage: `This will delete the selected user account ${rowData.name}, after it is deleted you cannot retrieve the data. Are you sure you want to delete this user ?`,
          showDialog: !state.showDialog,
          selectedUser: rowData,
        });

        break;
      case 'edit':
        setState({
          ...state,
          dialogTitle: `Update ${rowData.name}`,
          dialogMessage: `This will update the selected user account ${rowData.name}, if you confirm this will overwrite the current user data. Are you sure you want to update this user ?`,
          showDialog: !state.showDialog,
          selectedUser: rowData,
        });

        break;
      default:
        break;
    }
  };

  const deleteUser = () =>
    deleteAccount(host, token, state.selectedUser.id).subscribe(
      () => {
        const newData = state.data;
        const index = newData.indexOf(state.selectedUser);

        newData.splice(index, 1);

        setState({
          ...state,
          data: [...newData],
          showDialog: !state.showDialog,
          selectedUser: null as any,
        });
      },
      (error) => console.log(error),
    );

  const accountsTable = (
    <MaterialTable
      title="Accounts List"
      actions={[
        {
          icon: tableIcons.Add as any,
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: () => toggleModal()(),
        },
        {
          icon: tableIcons.Delete as any,
          tooltip: 'Delete User',
          onClick: (e, rowData) => toggleDialog(rowData, 'delete')(),
        },
        {
          icon: tableIcons.Edit as any,
          tooltip: 'Edit User',
          onClick: (e, rowData) => toggleModal(rowData, true)(),
        },
      ]}
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Roles', field: 'roles' },
      ]}
      data={state.data}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
      }}
    />
  );

  const accountModal = state.showModal && <AccountModel user={state.selectedUser} editing={state.editing} onSubmit={handleSubmit} open={state.showModal} onToggle={toggleModal} />;

  const deleteUserModal = state.showDialog && (
    <Dialog open={true} onClose={() => setState({ ...state, showDialog: false })}>
      <DialogTitle>{state.dialogTitle}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogContent>
        <DialogContentText>{state.dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={() => {}}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      {accountsTable}
      {deleteUserModal}
      {accountModal}
    </div>
  );
};

export default Accounts;
