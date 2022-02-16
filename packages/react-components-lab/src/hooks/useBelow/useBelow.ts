import { useState, useEffect, useCallback } from 'react';
import { useTheme, Breakpoint } from '@mui/material/styles';

export default (breakpoint: Breakpoint): boolean => {
  const theme = useTheme();

  const checkIsBelow = useCallback(
    () => theme.breakpoints.values[breakpoint] > window.innerWidth,
    [breakpoint, theme.breakpoints.values]
  );

  const [isBelow, setIsBelow] = useState(checkIsBelow());

  const handleResize = useCallback(() => {
    const newIsBelow = checkIsBelow();
    if (newIsBelow !== isBelow) setIsBelow(newIsBelow);
  }, [checkIsBelow, isBelow]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return isBelow;
};
