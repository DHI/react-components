import { Box, Chip, Avatar } from '@material-ui/core';
import React from 'react';

const ChipCell: React.FC<{ cell: any }> = ({ cell }) => {
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

export default ChipCell;
