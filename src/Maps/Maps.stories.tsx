import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { LayerControl } from './LayerControl/LayerControl';

export default {
  title: 'Maps Components',
  component: [LayerControl],
  decorators: [withKnobs],
};

export const LayerControlStory1 = () => {
  const legendGradient = [
    { value: '< 0.01', color: '#FFFFFF' },
    { value: '0.25', color: '#E3EEFA' },
    { value: '0.5', color: '#C6DDF4' },
    { value: '0.75', color: '#A9CCEF' },
    { value: '1', color: '#8CBBE9' },
    { value: '1.25', color: '#70AAE3' },
    { value: '1.5', color: '#5399DE' },
    { value: '1.75', color: '#3688D8' },
    { value: '> 2', color: '#1976D2' },
  ];

  const [checked, setChecked] = useState(false);
  const [opacity, setOpacity] = useState(100);

  return (
    <div style={{ width: 300 }}>
      <LayerControl
        checked
        color="primary"
        name="My Layer"
        onCheck={(checked) => setChecked(checked)}
        onOpacityChange={(opacity) => setOpacity(opacity)}
        showOpacityControl
        legendValuePostFix="m"
        legendGradient={legendGradient}
      ></LayerControl>
      <div>Checked: {String(checked)}</div>
      <div>Opacity: {opacity}</div>
    </div>
  );
};

export const LayerControlStory2 = () => {
  const legendGradient = [
    {
      value: 'DHI',
      icon:
        'https://www.dhigroup.com/-/media/shared%20content/global/global%20repository/logos/dhi/dhi_logo_pos_rgb_nomargin.png?h=61&la=en&w=94',
    },
  ];

  const [checked, setChecked] = useState(false);

  return (
    <div style={{ width: 300 }}>
      <LayerControl
        checked
        color="primary"
        name="My Layer"
        onCheck={(checked) => setChecked(checked)}
        legendGradient={legendGradient}
      ></LayerControl>
      <div>Checked: {String(checked)}</div>
    </div>
  );
};
