import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import React from 'react';

export const UsersFormatter = ({ value }) => (value.join(', '));

export const UsersTypeProvider: React.ComponentType<DataTypeProviderProps> = (props: DataTypeProviderProps) => (
  <DataTypeProvider
    formatterComponent={UsersFormatter}
    {...props}
  />
);