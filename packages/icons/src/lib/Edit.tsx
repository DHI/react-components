import React from 'react';

// #region Local imports
import SvgContainer from '../SvgContainer/SvgContainer';
import icon from '../svg-icons/edit.svg';
// #endregion

const EditIcon: React.FC = () => (
  <SvgContainer Icon={icon} width={40} height={40} />
);

export default EditIcon;
