import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

export default styled(Slider)(({ theme }) => ({
  '&.MuiSlider-root': {
    height: 8,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    border: '1px solid',
    borderColor: theme.palette.secondary.dark,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track, & .MuiSlider-rail': {
    height: 8,
    borderRadius: 4,
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
  },
}));
