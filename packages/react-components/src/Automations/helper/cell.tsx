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

export const FilterCellRow = (props) => {
    const { column, filter, onFilter } = props;

    if (column.name === 'actions'
        || column.name === 'triggerCondition.conditional'
        || column.name === 'triggerCondition.isMet'
    ) {

        return <></>
    }
    
    return <TableFilterRow.Cell {...props} />;
};

const Cell: React.FC<Table.DataCellProps> = (props) => {
    const { column, row, tableRow, tableColumn } = props;
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

    if (column.name === 'triggerCondition.conditional') {
        const triggers = row.triggerCondition?.triggers || [];
        const conditionals = row.triggerCondition?.conditional.match(/[\w]+|\s+|\(|\)|AND|OR/g) || [];

        const value = conditionals.map((conditional, index) => {
            let color = 'black';
            const id = conditional.trim();
            const trigger = triggers.find(trigger => trigger.id === id);
            if (trigger && !trigger.isMet) {
                color = 'red';
            }
            else if (trigger && trigger.isMet) {
                color = 'lightgreen'
            }

            return <span style={{ color }}>{conditional}</span>
        });

        return (
            <td className="MuiTableCell-root">
                {value}
            </td>
        )
    }


    if (column.name === 'triggerCondition.isMet') {
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
                <IconButton aria-label="view">
                    <Visibility />
                </IconButton>
                <IconButton aria-label="edit">
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteOutline />
                </IconButton>
            </td>
        );
    }

    return (
        <VirtualTable.Cell
            {...props}
            row={row}
            column={column}
            tableRow={tableRow}
            tableColumn={tableColumn}
            value={value}
        />
    );
};

export default Cell