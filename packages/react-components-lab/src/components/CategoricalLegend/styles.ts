import { makeStyles } from '@material-ui/core/styles';

const useCategoricalLegendStyles = makeStyles(() => ({
  legendColor: {
    height: 7,
    borderRadius: 10,
  },
  legendText: {
    fontSize: 12,
  },
}));

export default useCategoricalLegendStyles;
