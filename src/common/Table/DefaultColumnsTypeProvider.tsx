import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { Tooltip, Typography, Zoom } from '@material-ui/core';
import React from 'react';

export const DefaultColumnsFormatter = ({ value }) => {
  if (!value) return null;

  return (
    <Tooltip title={value} placement="bottom-start" TransitionComponent={Zoom}>
      <Typography noWrap variant="body2">
        {value}
      </Typography>
    </Tooltip>
  );
};

export const DefaultColumnsTypeProvider: React.ComponentType<DataTypeProviderProps> = (
  props: DataTypeProviderProps,
) => <DataTypeProvider formatterComponent={DefaultColumnsFormatter} {...props} />;
