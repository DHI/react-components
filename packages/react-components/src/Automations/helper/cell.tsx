import { TableFilterRow, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Chip, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Tooltip } from '@material-ui/core';
import {
    ArrowDropDownCircleOutlined,
    CheckOutlined,
    CloseRounded,
    DeleteOutline,
    Edit,
    ListOutlined,
    MenuBook,
    MenuTwoTone,
    RadioButtonUnchecked,
    Visibility
} from '@material-ui/icons';
import React, { useState } from 'react'
import { Table } from '@devexpress/dx-react-grid';
import { AutomationData, ITrigger } from '../type';
import StatusCell from '../../Jobs/JobList/helpers/StatusCell'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tooltip: {
        backgroundColor: 'rgba(249, 249, 249, 1)',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: 'none',
        maxWidth: 'none',
        border: '1px solid gray',
        padding: '10px'
    }
});
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

export const TriggerCell: React.FC<{ input: string, triggerList: ITrigger[] }> = ({ input, triggerList }) => {
    const triggers = triggerList
    const conditionals = input?.match(/[\w]+|\s+|\(|\)|AND|OR/g) || [];
    const value = conditionals.map((conditional, index) => {
        let color = 'lightgray';
        let fontColor = 'black';
        const id = conditional.trim();
        if (!id) {
            return <></>
        }
        const trigger = triggers.find(trigger => trigger.id === id);
        if (trigger && !trigger.isMet) {
            color = 'red';
            fontColor = 'white'
        }
        else if (trigger && trigger.isMet) {
            color = 'green'
            fontColor = 'white'
        }
        if (trigger && !trigger.isEnabled) {
            color = 'ligthgray'
        }
        return <Chip
            key={index}
            label={conditional}
            style={{ background: color, margin: '5px', color: fontColor }}
        />
    });

    return <>{value}</>
}

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
                {value ? 'Yes' : 'No'}
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
        const classes = useStyles();

        const triggers = row.triggerCondition?.triggers || [];
        const [tooltipOpen, setTooltipOpen] = useState(false);

        const handleTooltipOpen = () => {
            setTooltipOpen(true);
        };

        const handleTooltipClose = () => {
            setTooltipOpen(false);
        };
        if (!row.isEnabled) {
            return (
                <td className="MuiTableCell-root" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {row.triggerCondition?.conditional}
                        </div>
                        <Tooltip
                            open={tooltipOpen}
                            onClose={handleTooltipClose}
                            title={
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    background: 'white',
                                    width: '100%',
                                    fontSize: '14px'
                                }}
                                >
                                    {row.triggerCondition?.conditional}
                                </div>
                            }
                            PopperProps={{
                                style: { width: '100%' }
                            }}
                        >
                            <IconButton onClick={handleTooltipOpen}>
                                <ArrowDropDownCircleOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
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
            return <span key={index} style={{ color, marginRight: '2px', fontSize: '12px' }}>{conditional}</span>
        });

        return (
            <td className="MuiTableCell-root">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value}
                    </div>
                    <Tooltip
                        classes={{ tooltip: classes.tooltip }}
                        open={tooltipOpen}
                        onClose={handleTooltipClose}
                        title={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {value}
                            </div>
                        }
                        PopperProps={{
                            modifiers: {
                                offset: {
                                    enabled: true,
                                    offset: '-50,10'
                                }
                            }
                        }}
                    >
                        <IconButton onClick={handleTooltipOpen}>
                            <ArrowDropDownCircleOutlined />
                        </IconButton>
                    </Tooltip>
                </div>
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
                    <Chip
                        icon={<RadioButtonUnchecked style={{ color: 'green' }} />}
                        label="True"
                        variant="outlined"
                        size='small'
                    /> :
                    <Chip
                        icon={<RadioButtonUnchecked style={{ color: 'red' }} />}
                        label="False"
                        size='small'
                        variant="outlined"
                    />
                }
            </td>
        )
    }

    if (column.name === 'actions') {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        if (column.name === 'actions') {
            return (
                <td className="MuiTableCell-root">
                    <IconButton aria-label="open-popover" disabled={isLoading} onClick={handleClick}>
                        <ListOutlined />
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <List>
                            <ListItem button onClick={() => onViewAutomation(row)}>
                                <ListItemIcon>
                                    <Visibility />
                                </ListItemIcon>
                                <ListItemText primary="View" />
                            </ListItem>
                            <ListItem button onClick={() => onEditAutomation(row)}>
                                <ListItemIcon>
                                    <Edit />
                                </ListItemIcon>
                                <ListItemText primary="Edit" />
                            </ListItem>
                            <ListItem button onClick={() => onDeleteDialog(row.id)}>
                                <ListItemIcon>
                                    <DeleteOutline />
                                </ListItemIcon>
                                <ListItemText primary="Delete" />
                            </ListItem>
                        </List>
                    </Popover>
                </td>
            );
        }
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