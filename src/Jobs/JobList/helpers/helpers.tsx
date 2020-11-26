import { VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { format } from 'date-fns';
import * as React from 'react';
import StatusCell from './StatusCell';

export const GroupCellContent = (props: any) => (
  <span>
    <strong>{props.row.value}</strong>
  </span>
);

export const Cell = (props: any) => {
  if (props.column.name === 'status') {
    return (
      <td style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', paddingLeft: 10 }}>
        <StatusCell {...props} />
      </td>
    );
  }

  return <VirtualTable.Cell {...props} />;
};

export const dateGroupCriteria = (value) => {
  return { key: format(new Date(value), 'yyyy-MM-dd - HH:00') };
};
