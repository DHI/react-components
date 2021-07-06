import { BoxProps } from '@material-ui/core';

export interface StyleProps {
  gap?: number;
}

export interface Props extends BoxProps, StyleProps {}
