import { makeStyles, Theme } from '@material-ui/core/styles';

export const TreeViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    display: 'flex',
    padding: '6px 4px',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    position: 'relative',
    alignItems: 'center',
    fontSize: '0.8rem',
  },
  checkbox: {
    padding: '6px 4px',
  },
}));
