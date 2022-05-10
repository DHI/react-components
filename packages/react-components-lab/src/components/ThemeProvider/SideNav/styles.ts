import { makeStyles } from '@material-ui/core/styles';

// #endregion

const Styles = makeStyles((theme) => ({
  sidenav: {
    [`--offset`]: '2rem',
    flexGrow: 1,
    flexBasis: 230,
    alignSelf: 'start',
    position: 'sticky',
    top: '2rem',
  },
  sidenavHeader: {},
  sidenavContent: {},
  item: {},
  selected: {},
  component: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    position: 'relative',
    padding: '10px 10px 10px 25px',
    '& $sidenavHeader': {},
    '& $sidenavContent': {
      '& $ul': {
        listStyle: 'none',
        marginLeft: 0,
        paddingLeft: 0,
        '& $li': {
          paddingLeft: 10,
          lineHeight: '2.2em',
          '&:hover': {
            borderLeft: `3px solid ${theme.palette.primary.light}`,
            cursor: 'pointer',
          },
        },
        '& $selected': {
          color: theme.palette.primary.light,
          borderLeft: `3px solid ${theme.palette.primary.light}`,
        },
      },
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  tabItem: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'inherit',
  },
  divider: {
    margin: '10px 20px 10px 20px',
  },
}));

export default Styles;
