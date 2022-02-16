import React, { FC, useState, useCallback, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import useDebounce from './useDebounce';

const delay = 4000;

const DebounceExample: FC = () => {
  const [localValue, setLocalValue] = useState<number>(0);
  const [secondsPassed, setSecondsPassed] = useState<number | undefined>(
    undefined
  );
  const isDebounced = useDebounce(localValue, delay);

  const handleDebounce = useCallback(() => {
    setLocalValue(Number(localValue) + 1);
  }, [localValue, setLocalValue]);

  useEffect(() => {
    if (localValue !== 0) {
      setSecondsPassed(delay / 1000);
    }
    let delayCopy = Number(delay - 1000);
    const interval =
      localValue !== 0 &&
      setInterval(() => {
        setSecondsPassed(delayCopy / 1000);
        if (delayCopy === 0) clearInterval(interval);
        delayCopy -= 1000;
      }, 1000);
    return () => clearInterval(interval);
  }, [localValue]);

  return (
    <Box display="flex">
      <Button onClick={handleDebounce} variant="contained">
        Debounce me
      </Button>
      <Box ml={2} display="flex" justifyContent="center" flexDirection="column">
        {`Is debounced: ${String(isDebounced)}`}
        {localValue !== undefined && secondsPassed !== undefined && (
          <Box>{`The value will be: ${String(
            localValue
          )} in ${secondsPassed} seconds.`}</Box>
        )}
      </Box>
    </Box>
  );
};

export default DebounceExample;
