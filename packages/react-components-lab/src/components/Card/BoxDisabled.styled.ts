import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default styled(Box)(({ theme }) =>
  theme.unstable_sx({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    borderRadius: 4,
    backgroundColor: 'lightGrey.main',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  })
);
