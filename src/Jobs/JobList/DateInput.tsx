
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format, isValid } from 'date-fns';
import React, { useState } from 'react';
import { tzToUtc } from '../../utils/Utils';

const DateInput = ({ label, timeZone, dateSelected, defaultDate }: { label: string, timeZone: string, dateSelected: (value) => void, defaultDate?: string }) => {
  const [value, setValue] = useState('')
  const handleInputChange = (value) => {
    setValue(value)
    dateSelected(value)
  }
  return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      variant="inline"
      label={label}
      value={value || defaultDate}
      strictCompareDates={true}
      autoOk
      onChange={(newDate: MaterialUiPickersDate, newValue?: string | null | undefined): void => {
        if (isValid(newDate)) {
          const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss');

          handleInputChange(tzToUtc(formattedDate, timeZone));
        }
      }}
      style={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }
      }
    />
  </MuiPickersUtilsProvider>);
}

export default DateInput;