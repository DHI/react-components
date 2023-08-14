import { Box } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { InputFileBaseProps, InputFileProps } from './types';

const InputFileBase: FC<Partial<InputFileProps> & InputFileBaseProps> = ({
  accept,
  quantity,
  handleFileChange,
}) => {
  let theAccept = '';

  if (accept) {
    if (Array.isArray(accept)) {
      theAccept = accept.join(',');
    } else {
      theAccept = accept;
    }
  }

  return (
    <Box
      accept={theAccept}
      component="input"
      multiple={quantity === 'multiple'}
      sx={{ display: 'none' }}
      type="file"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e);
        e.target.files = null;
      }}
    />
  );
};

export default InputFileBase;
