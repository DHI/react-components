import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default styled(Box)({
  flexGrow: 1,
  flexBasis: 230,
  alignSelf: 'start',
  position: 'sticky',
  top: '2rem',
  [`--offset`]: '2rem',
});
