import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default styled(KeyboardArrowDownIcon)(({ theme }) => ({
  width: 24,
  height: 24,
  transition: theme.transitions.create(['transform']),
}));
