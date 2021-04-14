import { Column, DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { Box, Chip, Tooltip, Typography, Zoom } from '@material-ui/core';
import React from 'react';

interface MetadataFormatterProps extends Column {
  type?: string;
}

export const MetadataFormatter = ({
  column,
  row,
  value,
}: {
  column: MetadataFormatterProps;
  row?: any;
  value: any;
}) => {
  const { metadata } = row;
  const { name, type } = column;

  if (metadata && metadata[name] !== undefined) {
    switch (type) {
      case 'SingleChoice':
      case 'Text':
        return (
          <Tooltip title={metadata[name]} placement="bottom-start" TransitionComponent={Zoom}>
            <Typography noWrap variant="body2">
              {metadata[name]}
            </Typography>
          </Tooltip>
        );

      case 'MultiText':
      case 'MultiChoice':
        return (
          <Tooltip title={metadata[name].join(', ')} placement="bottom-start" TransitionComponent={Zoom}>
            <Typography noWrap variant="body2">
              {metadata[name].join(', ')}
            </Typography>
          </Tooltip>
        );

      case 'Boolean':
        return (
          <Box alignItems="center">
            <Chip label={metadata[name] ? 'Yes' : 'No'} style={{ marginRight: 4 }} />
          </Box>
        );

      default:
        return null;
    }
  }

  return null;
};

export const MetadataTypeProvider: React.ComponentType<DataTypeProviderProps> = (props: DataTypeProviderProps) => (
  <DataTypeProvider formatterComponent={MetadataFormatter} {...props} />
);
