import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default styled(Box)(({ theme }) => ({
  borderRadius: 4,
  cursor: 'pointer',
  transition: theme.transitions[1],
  flexGrow: 1,
  '&:hover': {
    backgroundColor: '#FFF',
  },
}));
