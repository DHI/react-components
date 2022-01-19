import React, { FC } from 'react';
import useBelow from './useBelow';

const BelowExample: FC = () => {
  const isBelowMd = useBelow('md');
  const isBelowSm = useBelow('sm');

  if (isBelowSm) {
    return <p>Window width is below 900px</p>;
  }
  if (isBelowMd) {
    return <p>Window width is below 1200px</p>;
  }
  return <p>Window width is above 1200px</p>;
};

export default BelowExample;
