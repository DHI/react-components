import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Checkbox, FormControlLabel, Typography, Radio } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import useStyles from './useStyles';
import { LayerControlProps } from './types';

const LayerControl = (props: LayerControlProps) => {
  const [legendGradientVisible, setLegendGradientVisible] = useState(props.checked);
  const [opacity, setOpacity] = useState(props.opacity);
  const classes = useStyles();
  const enabled = props.enabled !== undefined ? props.enabled : true;
  const legendStyle =
    props.legendHeight !== undefined ? { height: props.legendHeight, overflow: 'scroll' } : { height: 'auto' };

  const checkbox = enabled && (
    <FormControlLabel
      control={
        <Checkbox
          color={props.color || 'primary'}
          checked={props.checked}
          onChange={(event, checked: boolean) => {
            props.onCheck(checked);
            setLegendGradientVisible(checked);
          }}
        />
      }
      label={props.name}
    />
  );

  const legend = props.legendGradient && (
    <div className={classes.content} style={legendStyle}>
      {props.legendGradient.map((item, index) => (
        <div key={index} className={classes.legendItem}>
          {item.color ? (
            <Lens style={{ color: item.color, opacity }} />
          ) : (
            <img style={{ width: 'auto', height: 'auto', marginRight: '5px' }} src={item.icon} alt={item.value} />
          )}
          <Typography component="span" style={{ marginLeft: '10px' }}>
            {item.value}
            {props.legendValuePostFix && props.legendValuePostFix}
          </Typography>
        </div>
      ))}
    </div>
  );

  const slider = props.showOpacityControl && legendGradientVisible && (
    <Slider
      min={0}
      max={100}
      style={{ width: 100 }}
      value={props.opacity}
      onChange={(event, value) => {
        props.onOpacityChange(value as number);
        setOpacity((value as number) / 100);
      }}
      className={classes.slider}
    />
  );

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        {checkbox}
        {slider}
      </div>
      {legendGradientVisible && legend}
    </div>
  );
};

export { LayerControlProps, LayerControl };
