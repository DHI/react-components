/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { forwardRef, memo, useState } from 'react';
import { Box, Typography, Tooltip, IconButton, Collapse } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BoxWrapperStyled from './BoxWrapper.styled';
// #region Local imports
import { ComponentItemProps, SubList } from './types';
import Syntax from '../../Syntax/Syntax';
// #endregion

const ComponentItem: React.FC<ComponentItemProps> = forwardRef<
  HTMLElement,
  ComponentItemProps
>(({ item }, ref) => {
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const beautifyCode = (sub: SubList) =>
    sub.components.map((comp) => `${comp.codeExample}\n`).join('');

  return (
    <Box
      {...{ ref }}
      width={1}
      mt={5}
      paddingTop={10}
      id={`box-component-${item.title}`}
    >
      <Typography variant="h1">{item.title}</Typography>
      <Typography sx={{ margin: '20px 0 10px 0' }} variant="h5">
        {item.description}
      </Typography>
      {item.sub?.map((c, i) => (
        <div key={`${c.title}-${i}`}>
          <Typography variant="h2" sx={{ margin: '30px 0 10px 0' }}>
            {c.title}
          </Typography>
          <Typography variant="body2" sx={{ margin: '20px 0 10px 0' }}>
            {c.description}
          </Typography>
          <BoxWrapperStyled>
            {c.components?.map((c1, ii) => (
              <Box width={1} key={`component-${c.title}-${ii}`} m={1}>
                {c1.component}
              </Box>
            ))}
          </BoxWrapperStyled>
          {c.components.find((sl) => sl.codeExample) && (
            <>
              <Box display="flex" width={1} justifyContent="flex-end">
                <Tooltip title="Show code" placement="left">
                  <IconButton
                    onClick={() =>
                      setShowCode((prev) => ({
                        ...prev,
                        [c.title]: !showCode[c.title],
                      }))
                    }
                    size="large"
                  >
                    <CodeIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Collapse in={showCode[c.title]}>
                <Syntax
                  code={`import { ${item.title.replace(
                    ' ',
                    ''
                  )} } from '@mui/material'\n\n${beautifyCode(c)}`}
                />
              </Collapse>
            </>
          )}
        </div>
      ))}
    </Box>
  );
});

export default memo(ComponentItem);
