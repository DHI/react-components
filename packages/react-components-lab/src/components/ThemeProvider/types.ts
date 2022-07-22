import { ReactNode } from 'react';
import {
  Theme,
  Palette,
  PaletteColor,
  ComponentsOverrides,
  ThemeOptions,
} from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export interface ThemeProviderProps {
  overrides?: ComponentsOverrides;
  children?: ReactNode;
  mode?: PaletteMode;
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

export interface IMikeThemeOptions extends ThemeOptions {
  palette: IMikePalette;
}
