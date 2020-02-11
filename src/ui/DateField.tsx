import React, { useState } from 'react';
import 'date-fns';
import zhTW from 'date-fns/locale/zh-CN';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useTheme } from '@material-ui/core';

interface IDateFieldProps {
  onChange?: (value: any) => any;
  vertical?: boolean;
  value?: any;
  placeholder?: string;
  label?: string;
  withDayTime?: boolean;
}

const useStyles = makeStyles(
  theme => ({
    fieldWrapper: {
      padding: theme.spacing(1),
    },
    field: {
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.paper,
      },
      '& .MuiInputBase-input': {
        fontSize: '1.2rem',
        boxSizing: 'border-box',
        height: 45,
      },
    },
    dateModal: {
      transform: 'scale(1.3)',
    },
  }),
  { name: 'DateField' },
);

export const DateField = ({
  onChange,
  label,
  placeholder,
  vertical = false,
  withDayTime = false,
  ...props
}: IDateFieldProps) => {
  const [state, setstate] = useState({ date: null, time: null });
  const theme = useTheme();
  const classes = useStyles();
  const handleChange = (k: string) => (d: any) => {
    onChange && onChange(new Date(d));
    setstate(prev => ({ ...prev, [k]: new Date(d) }));
  };

  // const labelFunc = (d: any) => {
  //   return (d && format(d, 'yyyy-MM-dd')) || '';
  // };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhTW}>
      <Grid container alignItems="center" className={classes.fieldWrapper}>
        {label && (
          <Grid item xs={vertical ? 12 : undefined} style={{ marginBottom: 10 }}>
            <Typography variant="h4" color="primary">
              {label}
            </Typography>
          </Grid>
        )}
        <Grid item container xs={12} wrap="nowrap" >
          <Grid item xs style={{ width: 'auto', marginRight: theme.spacing(1) }}>
            <DatePicker
              margin="none"
              inputVariant="outlined"
              value={state.date}
              onChange={handleChange('date')}
              placeholder={placeholder}
              format="yyyy-MM-dd"
              showTodayButton
              disableToolbar
              className={classes.field}
              DialogProps={{
                className: classes.dateModal,
              }}
            />
          </Grid>
          {withDayTime && (
            <Grid item xs={5}>
              <TimePicker
                margin="none"
                inputVariant="outlined"
                value={state.time}
                onChange={handleChange('time')}
                placeholder={'HH:MM'}
                format="HH:mm"
                // disableToolbar
                ampm={false}
                className={classes.field}
                DialogProps={{
                  className: classes.dateModal,
                }}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
