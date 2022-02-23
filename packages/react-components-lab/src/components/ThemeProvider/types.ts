import { ReactNode } from 'react';
import {
  Theme,
  DeprecatedThemeOptions,
  Palette,
  PaletteColor,
  ComponentsOverrides,
} from '@mui/material/styles';

export interface IProps {
  overrides?: ComponentsOverrides;
  children?: ReactNode;
}

export interface IMikePalette extends Palette {
  ultimate?: PaletteColor;
  darkGrey?: PaletteColor;
  mediumGrey?: PaletteColor;
  lightGrey?: PaletteColor;
}

export interface IMikeTheme extends Theme {
  palette: IMikePalette;
  overrides?: ComponentsOverrides;
}

export interface IMikeThemeOptions extends DeprecatedThemeOptions {
  palette: IMikePalette;
}


