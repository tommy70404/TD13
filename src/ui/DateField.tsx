import React, { useState } from 'react';
import 'date-fns';
import zhTW from 'date-fns/locale/zh-CN';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  DatePickerProps,
} from '@material-ui/pickers';

type IDateFieldProps = DatePickerProps & {
  onChange?: (value: any) => any;
};

export const DateField = ({
  onChange,
  value,
  label,
  style,
  ...props
}: IDateFieldProps) => {
  const [touched, setTouch] = useState(false);
  const handleChange = (d: any) => {
    onChange && onChange(new Date(d));
    setTouch(true);
  };

  const labelFunc = (d: Date) => {
    return (d && format(d, 'yyyy/MM/dd')) || '';
  };
  
  return (
    <div style={style}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhTW}>
          <DatePicker
            margin="normal"
            label={label}
            value={value}
            onChange={handleChange}
            {...props}
          />
        </MuiPickersUtilsProvider>
    </div>
  );
};
