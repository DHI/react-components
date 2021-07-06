import { makeStyles, Theme } from '@material-ui/core/styles';
import { StyleProps } from './types';

export default makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    gap: (props) => theme.spacing(props.gap ?? 1),
  },
}));
