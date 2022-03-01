import React, { FC, createElement, useState } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import * as DhiIcons from '@dhi/icons/dist'; // eslint-disable-line import/no-unresolved
import copy from 'copy-to-clipboard';
import IconWrapperStyled from './IconWrapper.styled';

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
            >
              <Box height={1} display="flex" justifyContent="center">
                {createElement(DhiIconsTyped[item])}
              </Box>
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
        ))}
    </Box>
  );
};

export default Icons;
