import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { StyleProps } from './types';

export default makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    gap: (props) => theme.spacing(props.gap ?? 1),
  },
}));
