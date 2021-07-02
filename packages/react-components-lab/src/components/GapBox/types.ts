import { BoxProps } from '@material-ui/core';

interface StyleProps {
  gap?: number;
}

interface Props extends BoxProps, StyleProps {}

export { StyleProps, Props };
