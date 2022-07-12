// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Box, Button } from '@mui/material';
import SplashScreen from './SplashScreen';
import { SplashScreenProps } from './types';

export default { component: SplashScreen };
const Template: Story<SplashScreenProps> = (args) => <SplashScreen {...args} />;

export const MobileSplash = Template.bind({});
MobileSplash.args = {
  button: <Button variant="contained">Back to home</Button>,
  description:
    'Sorry, the interface of this application isn’t quite ready for mobile devices like yours',
  header: 'Head to your nearest desktop computer!',
  image: (
    <Box
      alt="image"
      component="img"
      src="https://grasdatastorage.blob.core.windows.net/images/DHI_Logo_rgb_Blue.svg"
    />
  ),
};
