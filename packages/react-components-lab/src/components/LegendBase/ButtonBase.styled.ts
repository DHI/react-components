import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';

export default styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(5),
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  '&.MuiButtonBase-root': {
    background: theme.palette.background.default,
    padding: theme.spacing(1),
  },
}));
