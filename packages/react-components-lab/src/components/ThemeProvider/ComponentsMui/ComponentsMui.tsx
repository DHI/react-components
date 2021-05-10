/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { ComponentsMuiProps } from './types';
import Syntax from '../../Syntax/Syntax';
import useStyles from './styles';

const ComponentsMui: React.FC<ComponentsMuiProps> = ({ dataList }) => {
  const classes = useStyles();
  return (
    <>
      {dataList?.map((item) => {
        const codeExample = item.components
          .map((comp) => `${comp.codeExample}\n`)
          .join('');

        return (
          <Box
            width={1}
            paddingTop={5}
            className={classes.container}
            id={item.title}
          >
            <Box display="flex" alignItems="flex-start" flexDirection="column">
              <>
                <Typography variant="h3">{item.title}</Typography>
                <Typography variant="body2" className={classes.desc}>
                  {item.description}
                </Typography>
                <Box
                  width={1}
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                  mb={2}
                  className={classes.exampleWrapper}
                >
                  {item.components.map((sub, i) => (
                    <Box m={1} key={`component-${item.title}-${i}`}>
                      {sub.component}
                    </Box>
                  ))}
                </Box>
                <Syntax code={codeExample} />
              </>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ComponentsMui;
