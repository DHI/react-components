import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import { FormControl, Input, InputLabel, MenuItem, Select, TableCell } from '@material-ui/core';
import React from 'react';

export const InputFilterCell = ({ filter, onFilter, column }) => (
  <TableCell>
    <Input
      value={filter ? filter.value : ''}
      onChange={(e) =>
        onFilter(e.target.value ? { value: e.target.value, operation: 'contains', columnType: column.type } : null)
      }
      placeholder="search..."
      inputProps={{
        style: { textAlign: 'right', height: 'inherit' },
        min: 1,
        max: 4,
      }}
    />
  </TableCell>
);

export const BooleanFilterCell = ({ filter, onFilter, column }) => (
  <TableCell>
    <FormControl>
      <InputLabel id="select-label">Select</InputLabel>
      <Select
        fullWidth
        labelId="select-label"
        value={filter ? filter.value : ''}
        id="filter"
        onChange={(e) =>
          onFilter(e.target.value ? { value: e.target.value, operation: 'contains', columnType: column.type } : null)
        }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Select>
    </FormControl>
  </TableCell>
);

export const FilterCellRow = (props) => {
  const { column } = props;

  if (column.type === 'Boolean') {
    return <BooleanFilterCell {...props} />;
  }
  if (
    column.type === 'Text' ||
    column.type === 'SingleChoice' ||
    column.type === 'MultiChoice' ||
    column.type === 'MultiText'
  ) {
    return <InputFilterCell {...props} />;
  }

  return <TableFilterRow.Cell {...props} />;
};

const metadataFilterService = [
  {
    type: 'SingleChoice',
    predicate: (value, filter, row) => {
      const { columnName } = filter;

      if (!row.metadata) return false;

      return row.metadata[columnName].toLowerCase().includes(filter.value.toLowerCase());
    },
  },
  {
    type: 'Text',
    predicate: (value, filter, row) => {
      const { columnName } = filter;

      if (!row.metadata) return false;

      return row.metadata[columnName].toLowerCase().includes(filter.value.toLowerCase());
    },
  },
  {
    type: 'MultiChoice',
    predicate: (value, filter, row) => {
      const { columnName } = filter;

      if (!row.metadata) return false;

      const regex = new RegExp(filter.value.toLowerCase(), 'g');
      const arrayToLowerCase = row.metadata[columnName].map((item) => item.toLowerCase());
      const result = regex.test(arrayToLowerCase);

      return result;
    },
  },
  {
    type: 'MultiText',
    predicate: (value, filter, row) => {
      const { columnName } = filter;

      if (!row.metadata) return false;

      const regex = new RegExp(filter.value.toLowerCase(), 'g');
      const arrayToLowerCase = row.metadata[columnName].map((item) => item.toLowerCase());
      const result = regex.test(arrayToLowerCase);

      return result;
    },
  },
  {
    type: 'Boolean',
    predicate: (value, filter, row) => {
      const { columnName } = filter;
      console.log(filter);

      if (!row.metadata) return false;

      let result;
      const myBooleanValue = filter.value === 'Yes';

      if (filter) {
        if (filter.value) {
          result = row.metadata[columnName] === myBooleanValue;
        } else {
          result = false;
        }
      }

      return result;
    },
  },
];

export const filterRules = (metadata) => {
  return metadataFilterService.map((item) => {
    let result = {};

    metadata.forEach((meta) => {
      if (item.type === meta.type) {
        result = {
          ...item,
          columnName: meta.key,
        };
      }
    });

    return result;
  });
};
