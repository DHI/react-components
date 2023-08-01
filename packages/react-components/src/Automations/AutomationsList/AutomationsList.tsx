import {
    FilteringState,
    GroupingState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedSorting,
    SortingState,
} from '@devexpress/dx-react-grid';
import {
    ColumnChooser,
    DragDropProvider,
    Grid,
    GroupingPanel,
    TableColumnVisibility,
    TableFilterRow,
    TableGroupRow,
    TableHeaderRow,
    Toolbar,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import React, { useEffect, useState } from 'react';
import { DefaultColumnsTypeProvider } from '../../common/Table';
import { Box, Paper } from '@material-ui/core';
import Cell, { FilterCellRow } from '../helper/cell';
import ToolbarAutomations from '../helper/toolbarAutomations';
import AutomationsListProps, { AutomationData } from '../type';
import DetailAutomationsDialog from '../helper/detailAutomationsDialog';
import FormAutomationDialog from '../helper/formAutomationDialog';
import { AutomationsListStyles } from '../styles';
import {
    deleteAutomation,
    fetchAllAutomation,
    fetchGroupId,
    fetchListAutomations,
    getScalarStatus,
    updateAutomation,
    updateStatusAutomation,
} from '../../api/Automations/AutomationApi';
import Loading from '../../common/Loading/Loading';
import GeneralDialog from '../../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../../common/GeneralDialog/types';
import { getFilterExtensions } from '../helper/helper';
import { ErrorProvider } from '../store';

const DEFAULT_COLUMNS = [
    { title: 'Group', name: 'group' },
    { title: 'Name', name: 'name' },
    { title: 'Task Id', name: 'taskId' },
    { title: 'Job Id', name: 'jobId' },
    { title: 'Enabled', name: 'isEnabled' },
    { title: 'Host Group', name: 'hostGroup' },
    { title: 'Trigger Condition', name: 'triggerCondition.conditional' },
    { title: 'Is Met', name: 'triggerCondition.isMet' },
    { title: 'Last Requested Time', name: 'requested' },
    { title: 'Current Status', name: 'currentStatus' },
    { title: 'Actions', name: 'actions' },
];

const defaultColumnsNameArray = DEFAULT_COLUMNS.map((column) => column.name);

function AutomationsList(props: AutomationsListProps) {
    const {
        dataSources,
        disabledColumns,
        jobReferringPage,
        disabledTextField,
        disabledTriggerNow
    } = props;
    const classes = AutomationsListStyles();
    const filteringColumnExtensions = getFilterExtensions()
    const [automations, setAutomations] = useState<AutomationData[]>([])
    const [filters, setFilters] = useState([]);
    const [detailAutomation, setDetailAutomation] = useState<AutomationData>()
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const [openFormAutomations, setOpenFormAutomations] = useState(false)
    const [openDetailsAutomation, setOpenDetailAutomation] = useState(false)
    const [dialog, setDialog] = useState<GeneralDialogProps>({
        dialogId: '',
        showDialog: false,
        title: ``,
        message: ``,
        cancelLabel: 'Cancel',
        confirmLabel: 'Confirm',
        onConfirm: () => null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let intervalId;
        (async () => {
            try {
                await fetchInitialData();
                intervalId = setInterval(async () => {
                    await fetchInitialData();
                }, 30000);
            } catch (error) {
                console.log('err', error);
            }
        })()

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const fetchAllAutomationData = await fetchAllAutomation(dataSources).toPromise()
            const automationsData = fetchAllAutomationData.map((item) => {
                const id = `${item.group}/${item.name}`
                const jobId = item.lastJobId
                const fullName = `${item.group}/${item.name}`
                let currentStatus = "Not Running"
                let requested = "Not Running"
                if (jobId) {
                    currentStatus = item.currentStatus
                    requested = item.lastRequestedTime
                }
                return { ...item, id, jobId, requested, currentStatus, fullName }
            })

            setAutomations(automationsData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDeleteDialog = (id: string) => {
        setDialog({
            dialogId: 'delete',
            showDialog: true,
            title: `Delete Automation`,
            message: `
                This will delete the selected Automtion from the list. After it is
                deleted you cannot retrieve the data. Are you sure you want to 
                delete this Automation?`,
            cancelLabel: 'Cancel',
            confirmLabel: 'Confirm',
            onConfirm: () => onDeleteAutomation(id),
        });
    };

    const onDeleteAutomation = (id: string) => {
        setLoading(true);
        deleteAutomation(dataSources, id).subscribe({
            next: async (res) => {
                try {
                    if (res.status === 204) {
                        await fetchInitialData();
                    } else {
                        console.log('Failed delete automation');
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    handleCloseDeleteDialog();
                    setLoading(false);
                }
            },
            error: (err) => {
                console.log(err);
                handleCloseDeleteDialog();
                setLoading(false);
            }
        });
    }

    const handleCloseDeleteDialog = () => {
        setDialog({
            ...dialog,
            showDialog: false,
        });
    };

    const handleOpenDetailsAutomation = (automation: AutomationData) => {
        setDetailAutomation(automation)
        setOpenDetailAutomation(true)
    }

    const handleCloseDetailAutomation = () => {
        setDetailAutomation(undefined)
        setOpenDetailAutomation(false)
    }

    const handleOpenFormAutomation = (automation?: AutomationData) => {
        setDetailAutomation(automation ?? undefined)
        setOpenFormAutomations(true)
    }

    const handleCloseFormAutomation = () => {
        setDetailAutomation(undefined)
        setOpenFormAutomations(false)
    }

    const handleTriggerNow = (automation) => {
        setDialog({
            dialogId: 'triggerNow',
            showDialog: true,
            title: `Trigger Now`,
            message: `
                This will trigger the selected Automtion. Are you sure you want to 
                trigger this Automation?`,
            cancelLabel: 'Cancel',
            confirmLabel: 'Confirm',
            onConfirm: () => onTriggerNow(automation),
        });
    }

    const handleChangeStatusAutomation = async (id, status) => {
        try {
            await updateStatusAutomation(dataSources, {
                id: id,
                flag: `${!status}`,
            })
            const updatedAutomations = automations.map((item) => {
                if (item.id === id) {
                    return { ...item, isEnabled: !item.isEnabled };
                }
                return item;
            });

            setAutomations(updatedAutomations);
        } catch (error) {
            console.log('error update status', error)
        }
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const onTriggerNow = (automation) => {
        const payload = {
            ...automation,
            id: automation.id,
            parameters: {
                utcNow: new Date().toISOString(),
                triggerNow: true
            }
        }
        updateAutomation(dataSources, payload).subscribe({
            next: async () => {
                try {
                    await fetchInitialData();
                } catch (err) {
                    console.log(err);
                } finally {
                    setDialog({
                        ...dialog,
                        showDialog: false,
                    });
                }
            },
            error: (err) => {
                console.log('Error run trigger automation:', err);
                setLoading(false);
            },
        });
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <>
            <GeneralDialog
                dialogId={dialog.dialogId}
                title={dialog.title}
                message={dialog.message}
                cancelLabel={dialog.cancelLabel}
                confirmLabel={dialog.confirmLabel}
                showDialog={dialog.showDialog}
                onConfirm={dialog.onConfirm}
                onCancel={handleCloseDeleteDialog}
                button={{
                    cancel: {
                        color: 'primary',
                        variant: 'contained'
                    },
                    submit: {
                        color: 'default',
                        variant: 'outlined'
                    },
                }}
                isLoading={loading}
            />
            <DetailAutomationsDialog
                open={openDetailsAutomation}
                onClose={handleCloseDetailAutomation}
                automation={detailAutomation}
            />
            <ErrorProvider>
                <FormAutomationDialog
                    disabledTextField={disabledTextField}
                    dataSources={dataSources}
                    setLoading={setLoading}
                    loading={loading}
                    fetchData={fetchInitialData}
                    open={openFormAutomations}
                    onClose={handleCloseFormAutomation}
                    automation={detailAutomation}
                    listAutomation={automations}
                />
            </ErrorProvider>
            <Box>
                <Paper className={classes.paperStyle}>
                    <ToolbarAutomations onClick={() => handleOpenFormAutomation(undefined)} />
                    {loading && <Loading />}
                    <Grid rows={automations} columns={DEFAULT_COLUMNS} >
                        <FilteringState
                            filters={filters}
                            onFiltersChange={handleFiltersChange}
                        />
                        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />

                        <SortingState defaultSorting={[{ columnName: 'group', direction: 'asc' }]} />
                        <IntegratedSorting />

                        <DragDropProvider />
                        <GroupingState />
                        <IntegratedGrouping />

                        <VirtualTable
                            cellComponent={(props) => (
                                <Cell
                                    {...props}
                                    pageJob={jobReferringPage}
                                    onViewAutomation={handleOpenDetailsAutomation}
                                    onEditAutomation={handleOpenFormAutomation}
                                    onDeleteDialog={handleOpenDeleteDialog}
                                    onTriggerNow={handleTriggerNow}
                                    updateStatus={handleChangeStatusAutomation}
                                    disableTriggerNow={disabledTriggerNow}
                                    isLoading={loading}
                                />
                            )}
                            height={windowHeight - 230}
                        />

                        <DefaultColumnsTypeProvider for={defaultColumnsNameArray} />
                        <TableHeaderRow showSortingControls />
                        <TableFilterRow cellComponent={FilterCellRow} />

                        <TableGroupRow />
                        <Toolbar />
                        <GroupingPanel showGroupingControls />
                        <TableColumnVisibility defaultHiddenColumnNames={disabledColumns} />
                        <ColumnChooser />
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}

export { AutomationsList }