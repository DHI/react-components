import React, { FC, useState } from 'react';
import { Box, Typography, Tooltip, SvgIcon, Grid } from '@material-ui/core';
import * as DhiIcons from '@dhi/icons/dist';
import copy from 'copy-to-clipboard';
import IconWrapperStyled from './IconWrapper.styled';

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
  const { __esModule, ...DhiIconsTyped } = DhiIcons as Record<string, FC>;
  const handleIcon = (item: string) => {
    copy(`import { ${item} } from "@dhi/icons";`);
    showTooltipText(item);
    setTimeout(() => {
      showTooltipText(undefined);
    }, 5000);
  };

  return (
<<<<<<< HEAD
    <Box
      flexWrap="wrap"
      width={1}
      sx={{
        backgroundColor: 'mediumGrey.main',
      }}
      display="flex"
      justifyContent="flex-start"
      p={1}
    >
      {Object.keys(DhiIconsTyped)
        .sort()
        .map((item) => (
          <Tooltip
            open={Boolean(tooltipText && tooltipText === item)}
            title={`Copied ${item} to clipboard.`}
          >
            <IconWrapperStyled
              onClick={() => handleIcon(item)}
              sx={{
                backgroundColor: 'lightGrey.light',
              }}
              m={0.5}
              p={1}
              width={130}
              height={70}
              display="flex"
              flexDirection="column"
=======
    <Grid container>
      {Object.keys(DhiIconsTyped)
        .sort()
        .map((item) => (
          <Grid item xs={2}>
            <Tooltip
              key={item}
              open={Boolean(tooltipText && tooltipText === item)}
              title={`Copied ${item} to clipboard.`}
>>>>>>> 37f3bba167b9f924484d9208e23a396d3d7d1ada
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
<<<<<<< HEAD
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontSize: 10,
                }}
              >
                {item}
              </Typography>
            </IconWrapperStyled>
          </Tooltip>
=======
            </Tooltip>
          </Grid>
>>>>>>> 37f3bba167b9f924484d9208e23a396d3d7d1ada
        ))}
    </Grid>
  );
};

export default Icons;
