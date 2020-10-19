import { Box, Chip, Avatar, Switch, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  switch: {
    '& .MuiSwitch-switchBase.Mui-disabled': {
      color: theme.palette.primary.main,
    },
  },
  multiText: {
    margin: 0,
  },
}));

const ChipCell = ({ cell }: { cell: any }) => {
  if (cell.row.values.userGroups != null) {
    return (
      <Box alignItems="center">
        {cell.row.values.userGroups.map((value) => (
          <Chip key={value} avatar={<Avatar>{value.substr(0, 1)}</Avatar>} label={value} style={{ marginRight: 4 }} />
        ))}
      </Box>
    );
  } else if (cell.row.values.users != null) {
    return (
      <Box alignItems="center">
        {cell.row.values.users.map((value) => (
          <Chip key={value} label={value} style={{ marginRight: 4 }} />
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
};

export const MetadataChipCell = ({ type }: { type: string }) => ({ value }: { value: any }) => {
  const classes = useStyles();

  if (typeof value === 'boolean') {
    return (
      <Switch
        color="primary"
        disabled
        checked={value}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        className={value ? classes.switch : ''}
      />
    );
  }
  if (type === 'MultiChoice' && value !== undefined) {
    return value.join(', ');
  }

  if (type === 'MultiText' && Array.isArray(value) && value !== undefined) {
    return value.join(', ');
  }

  return <>{value}</>;
};

export default ChipCell;
