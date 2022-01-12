import React, { FC, createElement, useState } from 'react';
import { Box, Typography, Tooltip } from '@material-ui/core';
import * as DhiIcons from '@dhi/icons/dist'; // eslint-disable-line import/no-unresolved
import copy from 'copy-to-clipboard';
import useStyles from './styles';

const Icons: FC = () => {
  const [tooltipText, showTooltipText] = useState<string | undefined>(
    undefined
  );
  const classes = useStyles();
  const { __esModule, ...DhiIconsTyped } = DhiIcons as Record<string, FC>;
  const handleIcon = (item: string) => {
    copy(`import { ${item} } from "@dhi/icons";`);
    showTooltipText(item);
    setTimeout(() => {
      showTooltipText(undefined);
    }, 5000);
  };

  return (
    <Box
      flexWrap="wrap"
      width={1}
      className={classes.root}
      display="flex"
      justifyContent="center"
    >
      {Object.keys(DhiIconsTyped)
        .sort()
        .map((item) => (
          <Tooltip
            open={Boolean(tooltipText && tooltipText === item)}
            title={`Copied ${item} to clipboard.`}
          >
            <Box
              onClick={() => handleIcon(item)}
              className={classes.iconWrapper}
              m={0.5}
              p={1}
              width={100}
              height={70}
              display="flex"
              flexDirection="column"
            >
              <Box height={1} display="flex" justifyContent="center">
                {createElement(DhiIconsTyped[item])}
              </Box>
              <Typography variant="body2" className={classes.iconText}>
                {item}
              </Typography>
            </Box>
          </Tooltip>
        ))}
    </Box>
  );
};

export default Icons;
