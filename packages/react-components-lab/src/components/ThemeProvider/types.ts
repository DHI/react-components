import { ReactNode } from 'react';
import { Theme, DeprecatedThemeOptions, Palette, PaletteColor, Overrides } from '@mui/material/styles';

export interface IProps {
  overrides?: Overrides;
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
  overrides?: Overrides;
}

export interface IMikeThemeOptions extends DeprecatedThemeOptions {
  palette: IMikePalette;
}

export const SPACING = 8;
export const HTML_FONT_SIZE = 16;
export const FONT_SIZE = 14;
export const FONT_FAMILY = [
  'Roboto',
  '-apple-system',
  'BlinkMacSystemFont',
  'Arial',
  'sans-serif',
].join(',');
