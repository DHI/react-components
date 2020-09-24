// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
import {
  createAccount,
  deleteAccount,
  fetchAccounts,
  updateAccount,
  updateUserGroupsForUser,
  fetchUserGroups,
} from '../DataServices/DataServices';
import { EditAccountDialog } from './EditAccountDialog';
import GeneralDialog from '../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../common/GeneralDialog/types';
import AccountTable from './AccountTable';

export const Accounts = ({ host, token, metadataAccounts }: AccountListProps) => {
  const [data, setData] = useState<AccountData[]>([]);
  const [state, setState] = useState({
    isAccountDialogOpen: false,
    isEditing: false,
    selectedUser: {
      id: '',
      name: '',
      email: '',
    } as AccountData,
    error: false,
    loading: true,
    dialog: {
      showDialog: false,
    } as Partial<GeneralDialogProps>,
  });
  let confirmDialog = null;

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
        setState({
          ...state,
          error: true,
          loading: false,
        });

        console.log(error);
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

  const handleUserSubmit = (user: EditUser, onCompleteCallback: () => void) => {
    if (state.isEditing) {
      updateAccount(host, token, user).subscribe(
        (updatedUser) => {
          updateUserGroupsForUser(host, token, { groups: user.userGroups, userId: updatedUser.id });

          setState({
            ...state,
            error: false,
            isAccountDialogOpen: false,
          });

          fetchData();
        },
        (error) => {
          setState({
            ...state,
            error: true,
          });

          console.log(error);
          onCompleteCallback();
        },
      );
    } else {
      createAccount(host, token, user).subscribe(
        (newUser) => {
          updateUserGroupsForUser(host, token, { groups: user.userGroups, userId: newUser.id });

          setState({
            ...state,
            error: false,
            isAccountDialogOpen: false,
          });

          fetchData();
        },
        (error) => {
          setState({
            ...state,
            error: true,
          });

          console.log(error);
          onCompleteCallback();
        },
      );
    }
  };

  const handleUserDelete = (user: AccountData) => {
    closeConfirmDialog();

    deleteAccount(host, token, user.id).subscribe(
      () => {
        fetchData();
      },
      (error: any) => console.log(error),
    );
  };

  const openNewUserDialog = () => {
    setState({
      ...state,
      isAccountDialogOpen: true,
      isEditing: false,
    });
  };

  const closeConfirmDialog = () => {
    setState({
      ...state,
      dialog: {
        ...state.dialog,
        showDialog: false,
      },
    });
  };

  const accountDialog = state.isAccountDialogOpen && (
    <EditAccountDialog
      token={token}
      host={host}
      metadataAccounts={metadataAccounts}
      user={state.selectedUser}
      dialogOpen={state.isAccountDialogOpen}
      isEditing={state.isEditing}
      onCancel={() => {
        setState({
          ...state,
          isAccountDialogOpen: false,
        });
      }}
      onSubmit={handleUserSubmit}
    />
  );

  if (state.dialog.showDialog) {
    confirmDialog = (
      <GeneralDialog
        dialogId="user"
        title={state.dialog.title}
        message={state.dialog.message}
        cancelLabel={state.dialog.cancelLabel}
        confirmLabel={state.dialog.confirmLabel}
        showDialog={state.dialog.showDialog}
        onConfirm={state.dialog.onConfirm}
        onCancel={closeConfirmDialog}
      />
    );
  }

  return (
    <div>
      <AccountTable
        error={state.error}
        loading={state.loading}
        users={data}
        metadataAccounts={metadataAccounts}
        onNew={openNewUserDialog}
        onEdit={(user) => {
          setState({
            ...state,
            isAccountDialogOpen: true,
            isEditing: true,
            selectedUser: user,
          });
        }}
        onDelete={(user) => {
          setState({
            ...state,
            dialog: {
              ...state.dialog,
              showDialog: !state.dialog.showDialog,
              title: `Delete ${user.name}`,
              message: `This will delete the selected user account ${user.name}, after it is deleted you cannot retrieve the data. Are you sure you want to delete this user?`,
              onConfirm: () => handleUserDelete(user),
            },
          });
        }}
      />
      {accountDialog}
      {confirmDialog}
    </div>
  );
};

export default Accounts;
