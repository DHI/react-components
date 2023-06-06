import React, { FC, useState } from 'react';
import { InputFileProps } from './types';
import { validateFiles } from './util';
import InputFileDropzone from './InputFileDropzone';
import InputFileButton from './InputFileButton';
import InputFileIconButton from './InputFileIconButton';

const InputFile: FC<InputFileProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  const { variant, accept, onFilesRejected, onFilesUploaded, replaceOnUpload } =
    props;

  const uploadFiles = (transferFiles: File[] | FileList) => {
    if (!transferFiles || !transferFiles.length) {
      return;
    }

    const [theFiles, rejectedFiles] = validateFiles(
      Array.from<File>(transferFiles),
      accept
    );

    if (rejectedFiles.length && onFilesRejected) {
      onFilesRejected(rejectedFiles);
    }

    if (!theFiles.length) {
      return;
    }

    if (replaceOnUpload) {
      setFiles(theFiles);
      onFilesUploaded?.(theFiles);
      return;
    }

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...theFiles];
      onFilesUploaded?.(newFiles);
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
