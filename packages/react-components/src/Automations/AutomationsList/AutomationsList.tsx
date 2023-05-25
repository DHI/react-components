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
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DefaultColumnsTypeProvider } from '../../common/Table';
import { Box, Paper } from '@material-ui/core';
import Cell, { FilterCellRow } from '../helper/cell';
import ToolbarAutomations from '../helper/toolbarAutomations';
import AutomationsListProps, { AutomationData } from './type';
import { DUMMY_DATA_AUTOMATIONS } from './dummyData';

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
    const { dataSources, disabledColumns, parameters, startTimeUtc, dateTimeFormat, timeZone } = props;
    const [automations, setAutomations] = useState<AutomationData[]>(DUMMY_DATA_AUTOMATIONS)
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const [openFormAutomations, setOpenFormAutomations] = useState(false)

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
        <Box>
            <Paper style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <ToolbarAutomations onClick={() => setOpenFormAutomations(true)} />
                <Grid rows={automations} columns={DEFAULT_COLUMNS} >
                    <FilteringState defaultFilters={[]} />
                    <IntegratedFiltering />

                    <SortingState defaultSorting={[{ columnName: 'group', direction: 'asc' }]} />
                    <IntegratedSorting />

                    <DragDropProvider />
                    <GroupingState />
                    <IntegratedGrouping />

                    <VirtualTable
                        cellComponent={Cell}
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
    )
}

export default AutomationsList