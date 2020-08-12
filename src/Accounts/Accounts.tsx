import AutoSizer from 'react-virtualized-auto-sizer';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableRow,
  TableCell,
  Typography,
  TableHead,
  Box,
  TableBody,
  CircularProgress,
  Chip,
  Avatar,
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
// eslint-disable-next-line prettier/prettier
import { AddBox, ArrowUpward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  createAccount,
  deleteAccount,
  fetchAccounts,
  updateAccount,
  updateUserGroupsForUser,
  fetchUserGroups,
} from '../DataServices/DataServices';
import { EditAccountDialog } from './EditAccountDialog';
import {
  useTable,
  UseTableOptions,
  UseFiltersOptions,
  UseGlobalFiltersOptions,
  useGlobalFilter,
  useBlockLayout,
  useFilters,
  TableInstance,
  UseGlobalFiltersInstanceProps,
} from 'react-table';
import { FixedSizeList } from 'react-window';
import { DefaultColumnFilter, GlobalFilter } from '../common/tableHelper';

// const tableIcons = {
//   Add: AddBox,
//   Delete: DeleteOutline,
//   DetailPanel: ChevronRight,
//   Export: SaveAlt,
//   Filter: FilterList,
//   NextPage: ChevronRight,
//   PreviousPage: ChevronLeft,
//   ResetSearch: Clear,
//   SortArrow: ArrowUpward,
//   ThirdStateCheck: Remove,
//   Edit,
//   FirstPage,
//   LastPage,
//   Search,
//   Check,
//   Clear,
//   ViewColumn,
// } as Icons;

// const accountsTable = (
//   <MaterialTable
//     title="Accounts List"
//     actions={[
//       {
//         icon: tableIcons.Add as any,
//         tooltip: 'Add User',
//         isFreeAction: true,
//         onClick: () => toggleModal()(),
//       },
//       {
//         icon: tableIcons.Delete as any,
//         tooltip: 'Delete User',
//         onClick: (_, rowData) => toggleDialog(rowData, 'delete')(),
//       },
//       {
//         icon: tableIcons.Edit as any,
//         tooltip: 'Edit User',
//         onClick: (_, rowData) => toggleModal(rowData, true)(),
//       },
//     ]}
//     columns={[]}
//     data={state.data}
//     icons={tableIcons}
//     options={{
//       actionsColumnIndex: -1,
//       exportButton: true,
//       pageSize: 25,
//       emptyRowsWhenPaging: false,
//       rowStyle: {
//         font: 'Roboto!important',
//       },
//     }}
//   />
// );

const Table = ({
  columns,
  data,
  translations,
  loading,
  windowHeight,
}: {
  columns: any;
  data: AccountData[];
  translations: any;
  loading: boolean;
  windowHeight: number;
}) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    minWidth: 30,
    maxWidth: 1000,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      autoResetFilters: false,
      autoResetGlobalFilter: false,
      columns,
      data,
      defaultColumn,
    } as UseTableOptions<AccountData> & UseFiltersOptions<AccountData> & UseGlobalFiltersOptions<AccountData>,
    useGlobalFilter,
    useBlockLayout,
    useFilters,
  ) as TableInstance<AccountData> & UseGlobalFiltersInstanceProps<AccountData>;

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);

      return (
        <TableRow
          component="div"
          {...row.getRowProps({
            style,
          })}
        >
          {row.cells.map((cell) => {
            return (
              <TableCell {...cell.getCellProps()} component="div">
                <Typography noWrap variant="body2">
                  {cell.render('Cell')}
                </Typography>
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
    [prepareRow, rows],
  );

  return (
    <MaUTable {...getTableProps()} component="div" size="small" aria-label="a dense table">
      <TableHead component="div">
        <TableRow component="div">
          <TableCell
            component="div"
            colSpan={visibleColumns.length}
            style={{
              float: 'right',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={(state as any).globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </TableCell>
        </TableRow>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()} component="div">
                <Box display="flex" flexDirection="row">
                  <Typography variant="subtitle1">{column.render('header')}</Typography>
                  {(column as any).canFilter ? column.render('Filter') : null}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()} component="div">
        {rows.length > 0 ? (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto', height: `${(windowHeight - 110).toString()}px` }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList height={height} itemCount={rows.length} itemSize={50} width={width}>
                    {RenderRow}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div>
          </div>
        ) : (
          <Typography
            align="center"
            component="div"
            style={{ lineHeight: `${(windowHeight - 110).toString()}px`, color: '#999999' }}
          >
            {loading && <CircularProgress />}
          </Typography>
        )}
      </TableBody>
    </MaUTable>
  );
};

export const Accounts = (props: AccountListProps) => {
  const { host, token, translations } = props;
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [state, setState] = useState({
    data: [] as AccountData[],
    dialogTitle: '',
    dialogMessage: '',
    editing: false,
    showDialog: false,
    showModal: false,
    selectedUser: {
      id: '',
      name: '',
      email: '',
    } as AccountData,
    loading: true,
  });

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const fetchData = () =>
    fetchAccounts(host, token).subscribe(
      (users) => {
        const userData = users.map((u: AccountData) => ({
          id: u.id,
          name: u.name,
          email: u.email ? u.email : '',
          // userGroups: u.userGroups, // not impl
        }));

        console.log('called');

        fetchUserGroups(host, token).subscribe(async (body: Record<any, any>) => {
          const userGroups = body as UserGroups[];
          const accountData = userData.map((u: AccountData) => ({
            ...u,
            userGroups: userGroups.filter((ug) => ug.users.indexOf(u.id) >= 0).map((ug) => ug.name),
          }));

          setState({
            ...state,
            data: accountData,
            loading: false,
          });
        });
      },
      (error) => console.log(error),
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

  const handleEditingSubmit = (editUser: EditUser) => {
    if (state.editing) {
      updateAccount(host, token, editUser).subscribe(
        (updatedUser) => {
          setState({
            ...state,
            data: [...state.data, updatedUser] as any,
            showModal: false,
            editing: false,
            selectedUser: {
              id: '',
              name: '',
              email: '',
              userGroups: [],
            },
          });

          updateUserGroupsForUser(host, token, { groups: editUser.userGroups, userId: updatedUser.id });
        },
        (error) => console.log(error),
      );
    } else {
      createAccount(host, token, editUser).subscribe(
        (newUser) => {
          updateUserGroupsForUser(host, token, { groups: editUser.userGroups, userId: newUser.id });

          return setState({
            ...state,
            data: [...state.data, newUser] as any,
            editing: false,
            showModal: false,
            selectedUser: {
              id: '',
              name: '',
              email: '',
              userGroups: [],
            },
          });
        },
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
      (error: any) => console.log(error),
    );

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessor: 'id',
        width: 120,
      },
      {
        header: 'Name',
        accessor: 'name',
        width: 160,
      },
      {
        header: 'Email',
        accessor: 'email',
        width: 250,
      },
      {
        header: 'User Groups',
        accessor: 'userGroups',
        width: 350,
        // eslint-disable-next-line react/display-name
        Cell: ({ cell }) => {
          return cell.row.values.userGroups != null ? (
            cell.row.values.userGroups.map((value) => (
              <>
                <Chip key={value} avatar={<Avatar>{value.substr(0, 1)}</Avatar>} label={value} />
                &nbsp;
              </>
            ))
          ) : (
            <></>
          );
        },
      },
      {
        header: 'Edit',
        width: 70,
        accessor: null,
        // eslint-disable-next-line react/display-name
        Cell: ({ cell }) => {
          return <></>;
        },
      },
    ],
    [state.data.length],
  );

  const accountModal = state.showModal && (
    <EditAccountDialog
      token={token}
      host={host}
      user={state.selectedUser}
      editing={state.editing}
      onSubmit={handleEditingSubmit}
      open={state.showModal}
      onToggle={toggleModal}
    />
  );

  const deleteUserModal = state.showDialog && (
    <Dialog open={true} onClose={() => setState({ ...state, showDialog: false })}>
      <DialogTitle>{state.dialogTitle}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogContent>
        <DialogContentText>{state.dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="secondary" onClick={() => deleteUser()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Table
        columns={columns}
        data={state.data}
        translations={translations}
        loading={state.loading}
        windowHeight={windowHeight}
      />
      {deleteUserModal}
      {accountModal}
    </div>
  );
};

export default Accounts;
