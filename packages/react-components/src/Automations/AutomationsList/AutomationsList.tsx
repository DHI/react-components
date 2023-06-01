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
import { DUMMY_DATA_AUTOMATIONS } from './dummyData';
import DetailAutomationsDialog from '../helper/detailAutomationsDialog';
import FormAutomationDialog from '../helper/formAutomationDialog';
import { AutomationsListStyles } from '../styles';
import { fetchGroupId, fetchListAutomations } from '../../api/Automations/AutomationApi';

const DEFAULT_COLUMNS = [
    { title: 'Group', name: 'group' },
    { title: 'Full Name', name: 'fullName' },
    { title: 'Task Id', name: 'taskId' },
    { title: 'Enabled', name: 'isEnabled' },
    { title: 'Host Id', name: 'hostId' },
    { title: 'Priority', name: 'priority' },
    { title: 'Updated Time', name: 'updated' },
    { title: 'Trigger Condition', name: 'triggerCondition.conditional' },
    { title: 'Final Statement', name: 'triggerCondition.isMet' },
    { title: 'Actions', name: 'actions' },
];

const defaultColumnsNameArray = DEFAULT_COLUMNS.map((column) => column.name);

function AutomationsList(props: AutomationsListProps) {
    const {
        dataSources,
        disabledColumns,
        parameters,
        startTimeUtc,
        dateTimeFormat,
        timeZone
    } = props;
    const classes = AutomationsListStyles();
    const [automations, setAutomations] = useState<AutomationData[]>([])
    const [detailAutomation, setDetailAutomation] = useState<AutomationData>()
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const [openFormAutomations, setOpenFormAutomations] = useState(false)
    const [openDetailsAutomation, setOpenDetailAutomation] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let intervalId;
        (async () => {
            setLoading(true);
            try {
                await fetchInitialData();
                intervalId = setInterval(async () => {
                    await fetchInitialData(true);
                }, 20000);
            } catch (error) {
                console.log('err', error);
            } finally {
                setLoading(false);
            }
        })()

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);


    const fetchInitialData = async (interval?: boolean) => {
        const newAutomations : AutomationData[] = [];
        const listGroupId = await fetchGroupId(dataSources).toPromise();
        for (let element of listGroupId) {
            const group = element.split('/');
            const automationsData = await fetchListAutomations(dataSources, group[0]).toPromise();
            if (interval) {
                newAutomations.push(...automationsData);
            } else {
                setAutomations((prevVal) => [...prevVal, ...automationsData]);
            }
        }
    
        if (interval) {
            setAutomations(newAutomations);
        }
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
            <DetailAutomationsDialog
                open={openDetailsAutomation}
                onClose={handleCloseDetailAutomation}
                automation={detailAutomation}
            />
            <FormAutomationDialog
                open={openFormAutomations}
                onClose={handleCloseFormAutomation}
                automation={detailAutomation}
            />
            <Box>
                <Paper className={classes.paperStyle}>
                    <ToolbarAutomations onClick={() => handleOpenFormAutomation(undefined)} />
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