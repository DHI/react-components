import { makeStyles, Theme } from '@material-ui/core/styles';
import { StyleProps } from './types';

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    gap: (props) => theme.spacing(props.gap ?? 1),
  },
}));

export default useStyles;
