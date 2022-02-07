import React, { FC } from 'react';
import { Button, Box } from '@material-ui/core';
import useLocalStorage from './useLocalStorage';

const LocalStorageExample: FC = () => {
  const [showData, setShowData] = useLocalStorage<boolean | undefined>(
    'showTheData'
  );
  return (
    <Box display="flex" alignItems="center">
      <Button variant="contained" onClick={() => setShowData(!showData)}>
        Toggle
      </Button>
      <Box ml={2} display="flex" alignItems="center">
        {`showTheData: ${String(showData)}`}
      </Box>
    </Box>
  );
};

export default LocalStorageExample;
