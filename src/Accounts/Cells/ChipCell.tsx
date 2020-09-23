import { Box, Chip, Avatar, Switch } from '@material-ui/core';
import React from 'react';

const ChipCell = ({ cell }: { cell: any }) => {
  return (
    <Box alignItems="center">
      {cell.row.values.userGroups != null ? (
        cell.row.values.userGroups.map((value) => (
          <Chip key={value} avatar={<Avatar>{value.substr(0, 1)}</Avatar>} label={value} style={{ marginRight: 4 }} />
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

export const MetadataChipCell = ({ type }: { type: string }) => ({ value }: { value: any }) => {
  if (typeof value === 'boolean') {
    return <Switch color="primary" checked={value} inputProps={{ 'aria-label': 'secondary checkbox' }} />;
  }
  if (type === 'MultiChoice' && value !== undefined) {
    return value.map((val, i) => (
      <Box alignItems="center" key={i}>
        <Chip key={val} avatar={<Avatar>{val.substr(0, 1)}</Avatar>} label={val} style={{ marginRight: 4 }} />
      </Box>
    ));
  }

  return <>{value}</>;
};

export default ChipCell;
