import React, { FC, useState } from 'react';
import InputFileButton from './InputFileButton';
import InputFileDropzone from './InputFileDropzone';
import InputFileIconButton from './InputFileIconButton';
import { InputFileProps } from './types';
import { validateFiles } from './util';

const InputFile: FC<InputFileProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  const {
    variant,
    accept,
    quantity,
    replaceOnUpload,
    getFiles,
    getRejectedFiles,
  } = props;

  const uploadFiles = (transferFiles: File[] | FileList) => {
    if (!transferFiles || !transferFiles.length) {
      return;
    }

    if (quantity === 'single' && transferFiles.length > 1) {
      getRejectedFiles?.(Array.from<File>(transferFiles));
      return;
    }

    const [theFiles, rejectedFiles] = validateFiles(
      Array.from<File>(transferFiles),
      accept
    );

    if (rejectedFiles.length && getRejectedFiles) {
      getRejectedFiles(rejectedFiles);
    }

    if (!theFiles.length) {
      return;
    }

    if (replaceOnUpload) {
      setFiles(theFiles);
      getFiles?.(theFiles);
      return;
    }

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...theFiles];
      getFiles?.(newFiles);
      return newFiles;
    });
  };

  const finalProps = {
    uploadFiles,
    files,
    setFiles,
    ...props,
  };

  return (
    <>
      {variant === 'dropzone' && <InputFileDropzone {...finalProps} />}
      {variant === 'button' && <InputFileButton {...finalProps} />}
      {variant === 'iconbutton' && <InputFileIconButton {...finalProps} />}
    </>
  );
};

InputFile.defaultProps = {
  replaceOnUpload: true,
  showFiles: true,
};

export default InputFile;
