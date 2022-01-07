import React, { FC, createElement } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as DhiIcons from '@dhi/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#000',
  },
}));

const Icons: FC = () => {
  const classes = useStyles();
  console.log(DhiIcons);
  return (
    <Box width={1} className={classes.root}>
      {Object.keys(DhiIcons).map((item) => createElement(DhiIcons[item]))}
    </Box>
  );
};

export default Icons;
