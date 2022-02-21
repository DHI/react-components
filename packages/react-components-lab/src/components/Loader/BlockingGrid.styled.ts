import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export default styled(Grid)({
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  height: '100vh',
  zIndex: 2000,
  backgroundColor: 'rgba(13,57,88,0.9)',
  color: '#ffffff',
});
