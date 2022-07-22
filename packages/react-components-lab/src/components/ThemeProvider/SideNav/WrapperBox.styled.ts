import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { IMikeTheme } from '../types';

export default styled(Box)(({ theme }: { theme: IMikeTheme }) => ({
  padding: 10,
  paddingLeft: 25,
  '& #sidenavContent': {
    '& ul': {
      listStyle: 'none',
      marginLeft: 0,
      paddingLeft: 0,
      '& li': {
        paddingLeft: 10,
        lineHeight: '2.2em',
        '&:hover': {
          borderLeft: `3px solid ${theme.palette.primary.light}`,
          cursor: 'pointer',
        },
      },
      '& .nav-selected': {
        color: theme.palette.primary.light,
        borderLeft: `3px solid ${theme.palette.primary.light}`,
      },
    },
  },
}));
