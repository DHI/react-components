import { VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Tooltip, Typography, Zoom } from '@material-ui/core';
import { differenceInMinutes, format } from 'date-fns';
import React from 'react';
import StatusCell from './StatusCell';

export const GroupCellContent = (props: any) => (
  <span>
    <strong>{props.row.value}</strong>
  </span>
);

export const Cell = (props: any) => {
  if (props.column.name === 'status') {
    return (
      <td className="MuiTableCell-root">
        <StatusCell {...props} />
      </td>
    );
  }

  if (props.column.name === 'delay') {
    const { requested, started } = props.row;

    if (!requested && !started) {
      return <td className="MuiTableCell-root"></td>;
    }

    const differenceMinutes = differenceInMinutes(new Date(props.row.started), new Date(props.row.requested));

    let delayColor = '';

    if (differenceMinutes > 30) {
      delayColor = 'darkorange';
    } else if (differenceMinutes > 60) {
      delayColor = ' red';
    }

    return (
      <td className="MuiTableCell-root" style={{ color: delayColor }}>
        {props.value && (
          <Tooltip title={props.value} placement="bottom-start" TransitionComponent={Zoom}>
            <Typography noWrap variant="body2">
              {props.value}
            </Typography>
          </Tooltip>
        )}
      </td>
    );
  }

  return <VirtualTable.Cell {...props} />;
};

export const dateGroupCriteria = (value) => {
  return { key: format(new Date(value), 'yyyy-MM-dd - HH:00') };
};
