import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format, isValid } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { toISOLocal, tzToUtc, utcToTz } from '../../utils/Utils';

const DateInput = ({
  label,
  dateFormat,
  timeZone,
  dateSelected,
  defaultDate,
  withTime = false,
}: {
  label: string;
  dateFormat: string;
  timeZone: string;
  dateSelected: (value) => void;
  defaultDate?: string;
  withTime?: boolean;
}) => {
  const [value, setValue] = useState<Date | string>(defaultDate || '');

  const handleInputChange = (value) => {
    const date = utcToTz(value, timeZone);
    setValue(date);
    dateSelected(toISOLocal(date));
  };

  useEffect(() => {
    setValue(format(new Date(defaultDate), dateFormat));
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {!withTime && (
        <KeyboardDatePicker
          variant="inline"
          label={label}
          value={value || null}
          format={dateFormat}
          maxDate={new Date()}
          strictCompareDates
          autoOk
          onChange={(newDate: MaterialUiPickersDate, newValue?: string | null | undefined): void => {
            if (isValid(newDate)) {
              const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss');
              handleInputChange(tzToUtc(formattedDate, timeZone));
            }
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        />
      )}
      {withTime && (
        <KeyboardDateTimePicker
          variant="inline"
          label={label}
          value={value || null}
          format={dateFormat}
          ampm={false}
          strictCompareDates
          autoOk
          onChange={(newDate: MaterialUiPickersDate, newValue?: string | null | undefined): void => {
            if (isValid(newDate)) {
              const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss');
              handleInputChange(tzToUtc(formattedDate, timeZone));
            }
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        />
      )}
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
