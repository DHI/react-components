import { VirtualTable } from '@devexpress/dx-react-grid-material-ui';
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

    const difference = differenceInMinutes(new Date(props.row.requested), new Date(props.row.started));
    const hour = Math.floor(difference / 60);
    const minute = Math.floor(difference - hour * 60);

    let delayColor = '';

    if (minute > 30) {
      delayColor = 'darkorange';
    } else if (minute > 60) {
      delayColor = ' red';
    }

    return (
      <td className="MuiTableCell-root" style={{ color: delayColor }}>
        {props.value}
      </td>
    );
  }

  return <VirtualTable.Cell {...props} />;
};

export const dateGroupCriteria = (value) => {
  return { key: format(new Date(value), 'yyyy-MM-dd - HH:00') };
};
