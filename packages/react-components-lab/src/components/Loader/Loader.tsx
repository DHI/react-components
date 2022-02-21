import React, { FC } from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';
import { LoaderProps } from './types';
import TopBarStyled from './TopBarBox.styled';
import BlockingGridStyled from './BlockingGrid.styled';

const Loader: FC<LoaderProps> = ({
  isLoading = false,
  variant = 'blocking',
  style = {},
}) => {
  if (isLoading) {
    if (variant === 'blocking')
      return (
        <BlockingGridStyled
          container
          alignItems="center"
          justifyContent="center"
          style={{ ...style }}
        >
          <CircularProgress color="inherit" size={50} thickness={5} />
        </BlockingGridStyled>
      );

    return (
      <TopBarStyled style={{ ...style }}>
        <LinearProgress color="primary" />
      </TopBarStyled>
    );
  }

  return null;
};

export default Loader;
