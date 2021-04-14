import { withKnobs } from '@storybook/addon-knobs';
import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import { ColourScale } from './ColourScale';

export default {
  title: 'Colour Scale Components',
  component: ColourScale,
  decorators: [withKnobs],
} as Meta;

export const ColourScalesStory = () => {
  return (
    <ColourScale
      type="intensity"
      mode="blocks"
      intervals={[0, 10, 20, 30, 40, 50]}
      height={24}
      markers={true}
      borderColour="transparent"
    />
  );
};
