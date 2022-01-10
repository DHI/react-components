import React, { FC, createElement } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as DhiIcons from '@dhi/icons'; // eslint-disable-line import/no-unresolved

const useStyles = makeStyles(() => ({
  root: {
    // backgroundColor: '#000',
  },
}));

const Icons: FC = () => {
  const classes = useStyles();
  const DhiIconsTyped = DhiIcons as Record<string, FC>;
  return (
    <Box width={1} className={classes.root}>
      {Object.keys(DhiIconsTyped).map((item) =>
        createElement(DhiIconsTyped[item])
      )}
    </Box>
  );
};

export default Icons;
