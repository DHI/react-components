import React from 'react';
import { Box, Typography } from '@material-ui/core';

// #region Local import
import { ComponentsMuiProps } from './types';
import useStyles from './styles';
// //#endregion

const ComponentsMui: React.FC<ComponentsMuiProps> = ({ dataList }) => {
  const classes = useStyles();

  return (
    <>
      {dataList &&
        dataList.map((item) => (
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
                <Box>{item.components.map((sub) => sub.component)}</Box>
              </>
            </Box>
          </Box>
        ))}
    </>
  );
};

export default ComponentsMui;
