import { Button } from '@mui/material';
import {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

export interface InputFileProps {
  variant: 'dropzone' | 'button' | 'iconbutton';
  quantity?: 'single' | 'multiple';
  accept?: string | string[];
  disabled?: boolean;
  showFiles?: boolean;
  replaceOnUpload?: boolean;
  text?: string;
  icon?: ReactNode;
  getRejectedFiles?: (file: File | File[]) => void;
  getFiles?: (file: File | File[]) => void;
  buttonProps?: ComponentProps<typeof Button>;
}

export interface InputVariantProps {
  files: File[];
  uploadFiles: (files: File[] | FileList) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export interface InputFileBaseProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
