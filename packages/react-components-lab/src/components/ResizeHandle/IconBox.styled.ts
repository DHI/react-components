import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export default styled(Box)(({ theme }) =>
  sx({
    zIndex: 10,
    padding: theme.spacing(2, 2, 0.2, 2),
    width: 20,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'darkGrey.main',
    position: 'relative',
    borderRadius: '20px 20px 0 0',
  })
);
