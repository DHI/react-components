import { SvgContainerStyleProps } from './types';

const styles = {
  root: {
    display: 'inline-flex',
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      height: `10px`,
      width: `10px`,
    },
  },
};

export default styles;
