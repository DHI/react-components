import React, { useState } from 'react';
import { Tooltip, IconButton, Menu, MenuItem, Box, Typography, Input } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { useAsyncDebounce } from 'react-table';

export const DefaultColumnFilter = () => {
  return null;
};

export const getColumnWidth = (data: Record<any, any>, accessor: string, headerText: string, minWidth: number) => {
  if (data.length > 0) {
    const spacing = 10;
    const cellLength = Math.max(...data.map((row) => (`${row[accessor]}` || '').length), headerText.length);

    return Math.max(minWidth, cellLength * spacing);
  } else {
    return minWidth;
  }
};

interface BaseFilter {
  column: {
    /** Value that use to filter the data */
    filterValue: string;
    /** Function to set the filter value data */
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    /** Row before data filtered */
    preFilteredRows: any;
    /** The id of column to be filtered */
    id: string;
  };
}

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }: BaseFilter) => {
  const options = React.useMemo(() => {
    const options = new Set();

    preFilteredRows.forEach((row: { values: { [x: string]: unknown } }) => {
      options.add((row.values[id] as string).toLowerCase());
    });

    if (options.size > 0) {
      return [...options.values()];
    } else {
      return [];
    }
  }, [id, preFilteredRows]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    setAnchorEl(null);
    setFilter(option);
  };

  return (
    <div>
      <Tooltip title="Filter list">
        <IconButton aria-label="Filter list" size={'small'} onClick={handleClick}>
          <FilterList />
        </IconButton>
      </Tooltip>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          selected={!filterValue}
          key={-1}
          onClick={() => {
            handleMenuItemClick('');
          }}
        >
          All
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={option === filterValue}
            onClick={() => {
              handleMenuItemClick(option as string);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box display="flex" flexDirection="row">
      <Typography variant="subtitle1" style={{ marginTop: '2px' }}>
        Search : {''}
      </Typography>
      &nbsp;
      <Input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records`}
      />
    </Box>
  );
};
