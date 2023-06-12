import { Upload } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import InputFileBase from './InputFileBase';
import { InputFileProps, InputVariantProps } from './types';

const InputFileIconButton: FC<Partial<InputFileProps> & InputVariantProps> = ({
  icon,
  accept,
  quantity,
  showFiles,
  files,
  uploadFiles,
}) => (
  <Stack alignItems="flex-start" gap={0.5} height={1} width={1}>
    <IconButton
      component="label"
      sx={{
        color: 'white',
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      {icon || <Upload />}
      <InputFileBase
        accept={accept}
        handleFileChange={(e) => uploadFiles(e.target.files)}
        quantity={quantity}
      />
    </IconButton>
    <Typography variant="caption">
      {showFiles &&
        files.length > 0 &&
        `File${files.length > 1 ? 's' : ''}: ${files
          .map((file) => file.name)
          .join(', ')}`}
    </Typography>
  </Stack>
);

export default InputFileIconButton;
