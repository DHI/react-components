import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export default styled(Box)(
  sx({
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
