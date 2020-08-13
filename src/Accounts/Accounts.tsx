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
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
// eslint-disable-next-line prettier/prettier
import { AddBox, ArrowUpward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, MoreVert, PictureAsPdf, EditOutlined } from '@material-ui/icons';
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
import GeneralDialog from '../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../common/GeneralDialog/types';

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
      data: data.map((item) => ({
        ...item,
        action: [item],
      })),
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
  const [data, setData] = useState<AccountData[]>([]);
  const [state, setState] = useState({
    isAccountDialogOpen: false,
    isEditing: false,
    selectedUser: {
      id: '',
      name: '',
      email: '',
    } as AccountData,
    loading: true,
    dialog: {
      showDialog: false,
    } as Partial<GeneralDialogProps>,
  });
  let confirmDialog = null;

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

  const handleUserSubmit = (user: EditUser, onCompleteCallback: () => void, closeCallback: () => void) => {
    if (state.isEditing) {
      updateAccount(host, token, user).subscribe(
        (updatedUser) => {
          updateUserGroupsForUser(host, token, { groups: user.userGroups, userId: updatedUser.id });

          setState({
            ...state,
            isAccountDialogOpen: false,
          });

          fetchData();
        },
        (error) => {
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
            isAccountDialogOpen: false,
          });

          fetchData();
        },
        (error) => {
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

  const ChipCell: React.FC<{ cell: any }> = ({ cell }) => {
    return cell.row.values.userGroups != null ? (
      cell.row.values.userGroups.map((value) => (
        <Chip key={value} avatar={<Avatar>{value.substr(0, 1)}</Avatar>} label={value} style={{ marginRight: 4 }} />
      ))
    ) : (
      <></>
    );
  };

  const ActionsCell: React.FC<ActionCell> = ({ item }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const accountData = item as AccountData;

    return (
      <Box alignItems="center" justifyContent="flex-end">
        <IconButton aria-haspopup="true" onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              setState({
                ...state,
                isAccountDialogOpen: true,
                isEditing: true,
                selectedUser: accountData,
              });
            }}
          >
            <EditOutlined color="secondary" style={{ marginRight: '0.5rem' }} fontSize="small" />
            Edit User
          </MenuItem>
          <Box my={1}>
            <Divider />
          </Box>
          <MenuItem
            onClick={() => {
              setState({
                ...state,
                dialog: {
                  ...state.dialog,
                  showDialog: !state.dialog.showDialog,
                  title: `Delete ${accountData.name}`,
                  message: `This will delete the selected user account ${accountData.name}, after it is deleted you cannot retrieve the data. Are you sure you want to delete this user?`,
                  onConfirm: () => handleUserDelete(accountData),
                },
              });
            }}
          >
            <DeleteOutline color="secondary" style={{ marginRight: '0.5rem' }} fontSize="small" />
            Delete User
          </MenuItem>
        </Menu>
      </Box>
    );
  };

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
        Cell: ChipCell,
      },
      {
        header: 'Actions',
        width: 80,
        accessor: 'action',
        Cell: ({
          cell: {
            value: [item],
          },
        }) => <ActionsCell item={item} />,
      },
    ],
    [data.length],
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
      <Button onClick={openNewUserDialog} color="primary" variant="contained">
        New User
      </Button>
      <Table
        columns={columns}
        data={data}
        translations={translations}
        loading={state.loading}
        windowHeight={windowHeight}
      />
      {accountDialog}
      {confirmDialog}
    </div>
  );
};

export default Accounts;
