import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  position: 'absolute',
  margin: theme.spacing(5),
  maxWidth: 120, // max according to specs
  transition: theme.transitions.create(['box-shadow']),
}));
