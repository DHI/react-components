import mikePalette from './mikePallete';

const muiRadioStyles = {
  background: 'transparent',
  height: '20px',
  width: '20px',
  margin: '-4px 0px',
  '& svg:nth-of-type(1)': {
    transform: 'scale(0.9)',
  },
  '& svg:nth-of-type(1) > path': {
    fill: mikePalette.darkGrey.main,
  },
  '&$disabled': {
    '& svg:nth-of-type(1) > path': {
      fill: mikePalette.darkGrey.light,
    },
  },
  /*  JSS `:after` won't apply to target unless there is a valid value for content: */
  '&:after': {
    content: 'open-quote',
    color: mikePalette.mediumGrey.light,
    background: mikePalette.mediumGrey.light,
    display: 'block',
    height: '20px',
    width: '20px',
    marginLeft: '-20px',
    borderRadius: '10px',
  },
};

export default muiRadioStyles;
