import { Column, DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import React from 'react';

interface MetadataFormatterProps extends Column {
  type?: string;
}

export const MetadataFormatter = (
  {
    column,
    row,
    value,
  }: {
    column: MetadataFormatterProps;
    row?: any;
    value: any;
  }
) => {

  const { metadata } = row;
  const { name, type } = column;

  if (metadata && metadata[name] !== undefined) {

    if (type === 'SingleChoice') {
      return metadata[name];
    }

    if (type === "MultiText") {
      return metadata[name].join(', ') || metadata[type].join(', ')
    }

    if (type === 'MultiChoice') {
      return metadata[name].join(', ')
    }

    if (type === 'Text') {
      return metadata[name]
    }

    if (type === 'Boolean') {
      if (metadata[name]) {
        return 'yes'
      } else {
        return 'no'
      }
    }

  } else {
    return null;
  }

  return value;

}

export const MetadataTypeProvider: React.ComponentType<DataTypeProviderProps> = (props: DataTypeProviderProps) => (
  <DataTypeProvider formatterComponent={MetadataFormatter} {...props} />
);


