import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import ColourScale from './ColourScale';

export default {
  title: 'Colour Scale Components',
  component: [ColourScale],
  decorators: [withKnobs],
};

export const ColourScalesStory = () => {
  return (
    <ColourScale type="intensity" mode="blocks" intervals={[]} height={24} markers={true} borderColour="transparent" />
  );
};
