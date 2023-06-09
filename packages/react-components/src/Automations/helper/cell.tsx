import { TableFilterRow, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { IconButton } from '@material-ui/core';
import {
    CheckOutlined,
    CloseRounded,
    DeleteOutline,
    Edit,
    Visibility
} from '@material-ui/icons';
import React from 'react'
import { Table } from '@devexpress/dx-react-grid';
import { AutomationData } from '../type';
import StatusCell from '../../Jobs/JobList/helpers/StatusCell'

interface CellProps extends Table.DataCellProps {
    onViewAutomation: (automation: AutomationData) => void;
    onEditAutomation: (automation: AutomationData) => void;
    onDeleteDialog: (id: string) => void
    isLoading: boolean
}

export const FilterCellRow = (props) => {
    const { column } = props;

    if (column.name === 'actions'
        || column.name === 'triggerCondition.conditional'
        || column.name === 'triggerCondition.isMet'
        || column.name === 'requested'
    ) {
        return <></>
    }

    return <TableFilterRow.Cell {...props} />;
};

const Cell: React.FC<CellProps> = (props) => {
    const {
        column,
        row,
        tableRow,
        tableColumn,
        onViewAutomation,
        onEditAutomation,
        onDeleteDialog,
        isLoading,
        ...rest
    } = props;
    const value = row[column.name];

    if (column.name === 'isEnabled') {
        return (
            <td className="MuiTableCell-root">
                {value ?
                    <CheckOutlined style={{ color: 'green' }} /> :
                    <CloseRounded style={{ color: 'red' }} />
                }
            </td>
        );
    }

    if (column.name === 'requested') {
        if (value) {
            const formattedDate = value?.split('.')[0].replace("T", " ")
            return (
                <td className="MuiTableCell-root">
                    {formattedDate}
                </td>
            );
        }
        return (
            <td className="MuiTableCell-root">
                {''}
            </td>
        )
    }

    if (column.name === 'triggerCondition.conditional') {
        const triggers = row.triggerCondition?.triggers || [];
        if (!row.isEnabled) {
            return (
                <td className="MuiTableCell-root">
                    {row.triggerCondition?.conditional}
                </td>
            )
        }
        const conditionals = row.triggerCondition?.conditional.match(/[\w]+|\s+|\(|\)|AND|OR/g) || [];
        const value = conditionals.map((conditional, index) => {
            let color = 'black';
            const id = conditional.trim();
            const trigger = triggers.find(trigger => trigger.id === id);
            if (trigger && !trigger.isMet) {
                color = 'red';
            }
            else if (trigger && trigger.isMet) {
                color = 'green'
            }
            if (trigger && !trigger.isEnabled) {
                color = 'black'
            }
            return <span key={index} style={{ color }}>{conditional}</span>
        });

        return (
            <td className="MuiTableCell-root">
                {value}
            </td>
        )
    }

    if (column.name === 'triggerCondition.isMet') {
        if (!row.isEnabled) {
            return (
                <td className="MuiTableCell-root">
                    Not Running
                </td>
            );
        }
        return (
            <td className="MuiTableCell-root">
                {row.triggerCondition?.isMet ?
                    <CheckOutlined style={{ color: 'green' }} /> :
                    <CloseRounded style={{ color: 'red' }} />}
            </td>
        );
    }

    if (column.name === 'actions') {
        return (
            <td className="MuiTableCell-root">
                <IconButton aria-label="view" disabled={isLoading} onClick={() => onViewAutomation(row)}>
                    <Visibility />
                </IconButton>
                <IconButton aria-label="edit" disabled={isLoading} onClick={() => onEditAutomation(row)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" disabled={isLoading} onClick={() => onDeleteDialog(row.id)}>
                    <DeleteOutline />
                </IconButton>
            </td>
        );
    }

    if (column.name === 'currentStatus') {
        return (
            <td className="MuiTableCell-root">
                <StatusCell row={{
                    status: row.currentStatus
                }} />
            </td>
        );
    }

    return (
        <VirtualTable.Cell
            {...rest}
            row={row}
            column={column}
            tableRow={tableRow}
            tableColumn={tableColumn}
            value={value}
        />
    );
};

export default Cell