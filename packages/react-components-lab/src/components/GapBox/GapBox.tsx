import React, { FC } from 'react';
import { Props } from './types';
import GapBoxStyled from './GapBox.styled';
// Extends MUI Box with gap style prop
const GapBox: FC<Props> = ({ gap = 1, children, ...otherProps }) => (
  <GapBoxStyled gap={gap} {...otherProps}>
    {children}
  </GapBoxStyled>
);

export default GapBox;
