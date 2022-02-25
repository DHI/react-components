/**
 * Creates marks on the slider between the 'min' and 'max' value.
 * 'tick' - Interval to show the marks.
 * 'markLabelInterval' - Interval to show labels.
 */
export const createSliderMarks = (min: number, max: number, tick: number, markLabelInterval: number): any[] => {
  let marks = [];
  for (let curr = min; curr <= max; curr += tick) {
    if ((curr - min) % markLabelInterval == 0) {
      marks.push({
        label: `${curr}`,
        value: curr,
      });
    } else {
      marks.push({
        value: curr,
      });
    }
  }
  return marks;
};
