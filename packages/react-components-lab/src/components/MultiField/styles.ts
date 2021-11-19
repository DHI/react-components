import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { MultiFieldStyleProps } from './types';

export default makeStyles<Theme, MultiFieldStyleProps>((theme) => ({
  root: {
    gap: 10,
  },
  field: {
    display: 'flex',
    '& input': {
      fontSize: ({ fontSize }) => fontSize,
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  },
  dash: {
    fontSize: ({ fontSize }) => fontSize,
    margin: theme.spacing(0, 1),
  },
}));
