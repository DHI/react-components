import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';

export interface InputFileProps {
  variant: 'dropzone' | 'button' | 'iconbutton';
  buttonVariant?: 'contained' | 'outlined';
  quantity?: 'single' | 'multiple';
  accept?: string | string[];
  disabled?: boolean;
  showFiles?: boolean;
  replaceOnUpload?: boolean;
  text?: string;
  icon?: ReactNode;
  onFilesRejected?: (file: File | File[]) => void;
  onFilesUploaded?: (file: File | File[]) => void;
}

export interface InputVariantProps {
  files: File[];
  uploadFiles: (files: File[] | FileList) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export interface InputFileBaseProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
