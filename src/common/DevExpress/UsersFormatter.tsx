import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { Tooltip, Typography, Zoom } from '@material-ui/core';
import React from 'react';

export const UsersFormatter = ({ value }) => {
  const list = value.join(', ');

  return (
    <Tooltip title={list} placement="bottom-start" TransitionComponent={Zoom}>
      <Typography noWrap variant="body2">
        {list}
      </Typography>
    </Tooltip>
  );
};

export const UsersTypeProvider: React.ComponentType<DataTypeProviderProps> = (props: DataTypeProviderProps) => (
  <DataTypeProvider formatterComponent={UsersFormatter} {...props} />
);
