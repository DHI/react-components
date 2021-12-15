export const getDailyFormattedDates = (dates: Date[]) =>
  dates.reduce((acc, item) => {
    const itemYear = item.getFullYear();
    acc[itemYear] = [...(acc[itemYear] || []), item];
    return acc;
  }, {});

export const getDateArray = (start: Date, end: Date): Date[] => {
  const arr = [];
  const dt = start;

  while (dt <= end) {
    console.log(arr); // right array
    arr.push(dt);
    dt.setDate(dt.getDate() + 1);
  }

  console.log(arr); // array containing only the last date

  return arr;
};
