import { styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

const ImgLegendStyled = styled('img')(
  sx({
    width: '100%',
    height: 6,
    borderRadius: 4,
    backgroundColor: 'primary.main',
  })
);

export default ImgLegendStyled;
