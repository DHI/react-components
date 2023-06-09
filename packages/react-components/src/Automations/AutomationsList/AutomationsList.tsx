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
    fetchGroupId,
    fetchListAutomations,
    getScalarStatus,
    fetchJob
} from '../../api/Automations/AutomationApi';
import Loading from '../../common/Loading/Loading';
import GeneralDialog from '../../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../../common/GeneralDialog/types';
import { applyConditionStatus, applyLastJobIdStatus, applyTriggerStatus, processScalarStatus } from '../helper/helper';

const DEFAULT_COLUMNS = [
    { title: 'Group', name: 'group' },
    { title: 'Name', name: 'name' },
    { title: 'Task Id', name: 'taskId' },
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
    } = props;
    const classes = AutomationsListStyles();
    const [automations, setAutomations] = useState<AutomationData[]>([])
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
                    await fetchInitialData(true);
                }, 25000);
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

    const processGroupIds = async (listGroupId, dataSources, conditionStatusMap: Map<string, boolean>, lastJobIdMap: Map<string, any>, triggerStatusMap: Map<string, boolean>, change?: boolean) => {
        const newAutomations: AutomationData[] = [];
        const uniqueGroupSet = new Set();
    
        for (let element of listGroupId) {
            const group = element.split('/');
            const groupId = group[0];
            if (uniqueGroupSet.has(groupId)) {
                continue;
            }
            uniqueGroupSet.add(groupId);
            const automationsData = await fetchListAutomations(dataSources, groupId).toPromise();
    
            for (let automation of automationsData) {
                applyConditionStatus(conditionStatusMap, automation);
                applyLastJobIdStatus(lastJobIdMap, dataSources, automation);
                applyTriggerStatus(triggerStatusMap, automation);
            }
    
            if (change) {
                newAutomations.push(...automationsData);
            } else {
                setAutomations((prevVal) => [...prevVal, ...automationsData]);
            }
        }
        
        return newAutomations;
    }
    
    const fetchInitialData = async (change?: boolean) => {
        setLoading(true);
        try {
            const listGroupId = await fetchGroupId(dataSources).toPromise();
            const scalarStatus = await getScalarStatus(dataSources).toPromise();
    
            const {conditionStatusMap, lastJobIdMap, triggerStatusMap} = processScalarStatus(scalarStatus);
            const automationsData = await processGroupIds(listGroupId, dataSources, conditionStatusMap, lastJobIdMap, triggerStatusMap, change);
            
            if (change) {
                setAutomations(automationsData);
            }
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
                This will delete the selected scenario from the list. After it is
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
                        await fetchInitialData(true);
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
                isLoading={loading}
            />
            <DetailAutomationsDialog
                open={openDetailsAutomation}
                onClose={handleCloseDetailAutomation}
                automation={detailAutomation}
            />
            <FormAutomationDialog
                dataSources={dataSources}
                setLoading={setLoading}
                loading={loading}
                fetchData={fetchInitialData}
                open={openFormAutomations}
                onClose={handleCloseFormAutomation}
                automation={detailAutomation}
            />
            <Box>
                <Paper className={classes.paperStyle}>
                    <ToolbarAutomations onClick={() => handleOpenFormAutomation(undefined)} />
                    {loading && <Loading />}
                    <Grid rows={automations} columns={DEFAULT_COLUMNS} >
                        <FilteringState defaultFilters={[]} />
                        <IntegratedFiltering />

                        <SortingState defaultSorting={[{ columnName: 'group', direction: 'asc' }]} />
                        <IntegratedSorting />

                        <DragDropProvider />
                        <GroupingState />
                        <IntegratedGrouping />

                        <VirtualTable
                            cellComponent={(props) => (
                                <Cell
                                    {...props}
                                    onViewAutomation={handleOpenDetailsAutomation}
                                    onEditAutomation={handleOpenFormAutomation}
                                    onDeleteDialog={handleOpenDeleteDialog}
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

export default AutomationsList