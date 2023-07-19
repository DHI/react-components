import { TableFilterRow, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Chip, Divider, FormControlLabel, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Switch, Tooltip, Typography } from '@material-ui/core';
import {
    ArrowDropDownCircleOutlined,
    DeleteOutline,
    Edit,
    ListOutlined,
    PlayCircleOutline,
    RadioButtonUnchecked,
    Visibility
} from '@material-ui/icons';
import React, { useState } from 'react'
import { Table } from '@devexpress/dx-react-grid';
import { AutomationData, ITrigger } from '../type';
import StatusCell from '../../Jobs/JobList/helpers/StatusCell'
import { CellStyles } from '../styles';

interface CellProps extends Table.DataCellProps {
    onViewAutomation: (automation: AutomationData) => void;
    onEditAutomation: (automation: AutomationData) => void;
    onDeleteDialog: (id: string) => void
    updateStatus: (id: string, status: boolean) => void
    onTriggerNow: (automation: AutomationData) => void;
    disableTriggerNow: boolean
    isLoading: boolean
    pageJob: string
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
        onTriggerNow,
        updateStatus,
        disableTriggerNow,
        isLoading,
        pageJob,
        ...rest
    } = props;
    const value = row[column.name];
    const classes = CellStyles();

    if (column.name === 'jobId') {
        // Comment Until Routing Issue Found
        // const handleClick = () => {
        //     window.location.assign(`${pageJob}/${row.taskId}`);
        // };

        return (
            <td className="MuiTableCell-root">
                <Tooltip title={value}>
                    <div
                        style={{
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    // onClick={handleClick}
                    >
                        {value}
                    </div>
                </Tooltip>
            </td>

        )
    }

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
                    <Box className={classes.wrapperTooltip}>
                        <Box className={classes.conditionalElipsis}>
                            {row.triggerCondition?.conditional}
                        </Box>
                        <Tooltip
                            open={tooltipOpen}
                            onClose={handleTooltipClose}
                            title={
                                <Box className={classes.titleTooltip}
                                >
                                    {row.triggerCondition?.conditional}
                                </Box>
                            }
                            PopperProps={{ style: { width: '100%' } }}
                        >
                            <IconButton onClick={handleTooltipOpen}>
                                <ArrowDropDownCircleOutlined />
                            </IconButton>
                        </Tooltip>
                    </Box>
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
                <Box className={classes.wrapperTooltip}>
                    <Box className={classes.conditionalElipsis}>
                        {value}
                    </Box>
                    <Tooltip
                        classes={{ tooltip: classes.tooltip }}
                        open={tooltipOpen}
                        onClose={handleTooltipClose}
                        title={
                            <Box className={classes.titleColoringTooltip}>
                                {value}
                            </Box>
                        }
                        PopperProps={{
                            modifiers: {
                                offset: {
                                    enabled: true,
                                    offset: '-50'
                                }
                            }
                        }}
                    >
                        <IconButton onClick={handleTooltipOpen}>
                            <ArrowDropDownCircleOutlined />
                        </IconButton>
                    </Tooltip>
                </Box>
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
                            <ListItem button disabled={disableTriggerNow || !row.isEnabled} onClick={() => onTriggerNow(row)}>
                                <ListItemIcon>
                                    <PlayCircleOutline />
                                </ListItemIcon>
                                <ListItemText primary="Trigger Now" />
                            </ListItem>
                            <Divider />
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
                            <ListItem>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={row.isEnabled}
                                            onChange={() => updateStatus(row.id, row.isEnabled)}
                                            name='isEnabled'
                                            color='primary'
                                        />
                                    }
                                    label={<Typography variant="body1">Enabled</Typography>}
                                    labelPlacement="start"
                                />
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