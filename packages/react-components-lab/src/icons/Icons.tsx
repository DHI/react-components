import React, { FC, useState } from 'react';
import { Box, Typography, Tooltip, SvgIcon, Grid } from '@material-ui/core';
import * as DhiIcons from '@dhi/icons/dist';
import copy from 'copy-to-clipboard';
import useStyles from './styles';

type ModuleType = typeof DhiIcons;

export function getIcon<K extends keyof ModuleType>(
  input: K | string
): typeof SvgIcon {
  const foundIcon = Object.keys(DhiIcons).find((key) => key === input);
  return DhiIcons[foundIcon as K];
}

const DynamicIcon: FC<{ name: string }> = ({ name }) => {
  const IconComponent = getIcon(name);
  return <IconComponent fontSize="large" />;
};

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
    <Grid container>
      {Object.keys(DhiIconsTyped)
        .sort()
        .map((item) => (
          <Grid item xs={2}>
            <Tooltip
              key={item}
              open={Boolean(tooltipText && tooltipText === item)}
              title={`Copied ${item} to clipboard.`}
            >
              <Box
                onClick={() => handleIcon(item)}
                className={classes.iconWrapper}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <DynamicIcon name={item} />
                <Typography variant="body1" className={classes.iconText}>
                  {item}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        ))}
    </Grid>
  );
};

export default Icons;
