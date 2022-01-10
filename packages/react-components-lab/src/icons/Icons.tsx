import React, { FC, createElement, useState } from 'react';
import { Box, Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as DhiIcons from '@dhi/icons'; // eslint-disable-line import/no-unresolved
import { IMikeTheme } from '../components/ThemeProvider/types';
import copy from "copy-to-clipboard"
const useStyles = makeStyles<IMikeTheme>((theme) => ({
  root: {
    backgroundColor: theme.palette.mediumGrey.main,
  },
  iconWrapper: {
    backgroundColor: theme.palette.lightGrey.light,
    borderRadius: 4,
    cursor: 'pointer',
    transition: theme.transitions[1],
    '&:hover': {
      backgroundColor: '#FFF'
    }
  },
  icon: {
    width: 20,
    height: 20
  },
  iconText: {
    fontSize: 10,
    textAlign: 'center'
  }
}));

const Icons: FC = () => {
  const [tooltipText, showTooltipText] = useState<string | undefined>(undefined)
  const classes = useStyles();
  const DhiIconsTyped = DhiIcons as Record<string, FC>;

  const handleIcon = (item: string) => {
    copy(`import { ${item} } from "@dhi/icons";`)
    showTooltipText(item)
    setTimeout(() => {
      showTooltipText(undefined)
    }, 5000)
  }

  return (
    <Box flexWrap={'wrap'} width={1} className={classes.root} display={'flex'} justifyContent={'center'}>
      {Object.keys(DhiIconsTyped).map((item) =>
      <Tooltip open={Boolean(tooltipText && tooltipText === item)} title={`Copied ${item} to clipboard.`}>
        <Box onClick={() => handleIcon(item)} className={classes.iconWrapper} m={0.5} p={1} width={100} height={70} display={'flex'} flexDirection={'column'}>
          <Box height={1} display={'flex'} justifyContent={'center'}>
            {createElement(DhiIconsTyped[item])}
          </Box>
          <Typography variant={'body2'} className={classes.iconText}>
            {item}
          </Typography>
        </Box>
      </Tooltip>
      )}
    </Box>
  );
};

export default Icons;
