import React, { memo } from 'react';

// #region Local imports
import { SvgContainerProps } from './types';
import useStyles from './styles';
// #endregion

const SvgContainer: React.FC<SvgContainerProps> = ({ Icon, ...rest }) => {
  const props = { ...rest };

  return (
    <div style={useStyles.root} {...props}>
      <Icon />
    </div>
  );
};

export default memo(SvgContainer);
