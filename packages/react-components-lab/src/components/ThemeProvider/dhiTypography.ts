import { TypographyVariantsOptions, Palette } from '@mui/material/styles';

const FONT_FAMILY = [
  'Roboto',
  '-apple-system',
  'BlinkMacSystemFont',
  'Arial',
  'sans-serif',
].join(',');

const dhiTypography:
  | TypographyVariantsOptions
  | ((palette: Palette) => TypographyVariantsOptions) = {
  htmlFontSize: 16,
  fontSize: 14,
  fontFamily: FONT_FAMILY,
  h1: {
    fontSize: '6rem', // 96px
    lineHeight: 3.5, // 112px - default mui:1
    fontWeight: 300,
  },
  h2: {
    fontSize: '3.75rem', // 60px
    lineHeight: 2.9, // 70px  - default mui:1
    fontWeight: 300,
  },
  h3: {
    fontSize: '3rem', // 48px
    lineHeight: 2.8, // 56px  - default mui:1.04
    fontWeight: 'normal', // 400
  },
  h4: {
    fontSize: '2.125rem', // 34px
    lineHeight: 2.5, // 40px  - default mui:1.17
    fontWeight: 'normal', // 400
  },
  h5: {
    fontSize: '1.5rem', // 24px
    lineHeight: 2, // 28px  - default mui:1.33
    fontWeight: 'normal', // 400
  },
  h6: {
    // Used by mui for DialogTitles
    fontSize: '1.25rem', // 20 px
    lineHeight: 1.15, // 24px  - default mui:1.6
    fontWeight: 500,
  },
  subtitle1: {}, // default mui: 1rem / 1.75 / weight:400
  subtitle2: {}, // default mui: 0.875rem / 1.57  / weight: 500
  body1: {
    // In Figma: Body Text
    // default mui: 1rem / 1.5.
    fontSize: '1rem', // 16px
    lineHeight: 1.374, // 22px
  },
  body2: {
    // In Figma: Body Text (S)
    // default mui: 0.875rem / 1.43
    fontSize: '0.875rem', // 14px
    lineHeight: 1.286, // 18px
  },
  button: {
    fontWeight: 'bold', // 700
  }, // default mui: 0.875rem / 1.75 / UPPERCASE
  caption: {}, // default mui: 0.75rem / 1.66 / weight: 400
  overline: {
    fontSize: '0.625rem',
  }, // default mui: / 2.66 /cweight: 400/ UPPERCASE
};

export default dhiTypography;
