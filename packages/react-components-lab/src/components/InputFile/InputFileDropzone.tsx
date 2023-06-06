// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-array-index-key  */
import { Clear, FileUpload } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { DragEvent, FC, MouseEvent, useState } from 'react';
import { InputFileProps, InputVariantProps } from './types';
import styles from './styles';
import InputFileBase from './InputFileBase';

const InputFileDropzone: FC<Partial<InputFileProps> & InputVariantProps> = ({
  accept,
  disabled,
  quantity,
  showFiles,
  uploadFiles,
  text,
  icon,
  files,
  setFiles,
}) => {
  const [dragging, setDragging] = useState(false);

  const prevent = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
    prevent(e);

    if (!disabled) {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    prevent(e);

    if (!disabled) {
      setDragging(true);
    } else {
      // set cursor to no-drop
      e.dataTransfer.dropEffect = 'none';
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    prevent(e);

    if (disabled) {
      return;
    }

    setDragging(false);
    uploadFiles(e.dataTransfer.files);
    e.dataTransfer.clearData();
  };

  const handleRemoveFile = (i: number) => (e: MouseEvent) => {
    e.preventDefault();
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== i));
  };

  return (
    <Box
      component="label"
      sx={{
        ...styles.dropzone,
        ...(dragging ? styles.dropzoneActive : styles.dropzoneInactive),
        ...(disabled && styles.disabled),
      }}
      onDragEnter={prevent}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Stack alignItems="center" justifyContent="center">
        {icon || <FileUpload fontSize="large" />}

        <Typography variant="h3">
          {dragging
            ? 'Release to upload'
            : text || 'Drop a file here to upload'}
        </Typography>
        <Box mt={1}>
          <InputFileBase
            accept={accept}
            handleFileChange={(e) => uploadFiles(e.target.files)}
            quantity={quantity}
          />

          {showFiles &&
            files.map((file, i) => (
              <Stack alignItems="center" direction="row" key={`file-${i}`}>
                <IconButton
                  size="small"
                  sx={{ height: 24, width: 24 }}
                  disableRipple
                  onClick={handleRemoveFile(i)}
                >
                  <Clear />
                </IconButton>
                <Typography key={i}>{file.name}</Typography>
              </Stack>
            ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default InputFileDropzone;
