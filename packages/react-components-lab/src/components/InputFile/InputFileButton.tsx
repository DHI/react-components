import { Upload } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { InputFileProps, InputVariantProps } from './types';
import InputFileBase from './InputFileBase';

const InputFileButton: FC<Partial<InputFileProps> & InputVariantProps> = ({
  accept,
  quantity,
  buttonVariant,
  files,
  uploadFiles,
  showFiles,
  text,
  icon,
}) => (
  <Stack gap={0.5} height={1} width={1}>
    <Button
      component="label"
      startIcon={icon || <Upload />}
      variant={buttonVariant || 'contained'}
    >
      {text || 'Upload'}
      <InputFileBase
        accept={accept}
        handleFileChange={(e) => uploadFiles(e.target.files)}
        quantity={quantity}
      />
    </Button>
    <Typography variant="caption">
      {showFiles &&
        files.length > 0 &&
        `File${files.length > 1 ? 's' : ''}: ${files
          .map((file) => file.name)
          .join(', ')}`}
    </Typography>
  </Stack>
);

export default InputFileButton;
