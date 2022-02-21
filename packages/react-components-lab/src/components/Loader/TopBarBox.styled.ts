import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default styled(Box)({
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  height: '4px',
  zIndex: 2000,
  color: 'white',
});
