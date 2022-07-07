import { ReactNode } from 'react';
import { Theme, ThemeOptions } from '@material-ui/core/styles';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import { PaletteType } from '@material-ui/core';

export interface IProps {
  overrides?: ThemeOptions;
  children?: ReactNode;
  type?: PaletteType;
}

export interface IMikePalette extends Palette {
  ultimate?: PaletteColor;
  darkGrey?: PaletteColor;
  mediumGrey?: PaletteColor;
  lightGrey?: PaletteColor;
}

export interface IMikeTheme extends Theme {
  palette: IMikePalette;
}

export interface IMikeThemeOptions extends ThemeOptions {
  palette?: IMikePalette;
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
