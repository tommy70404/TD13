import React, { useState } from 'react';
import {
  FormControl,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';

interface IRadioGroupFieldProps {
  options: {
    value?: any;
    label: string;
  }[];
  value?: any;
  onChange?: (v: any) => void;
  label?: string;
  vertical?: boolean;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    wrapper: {
      padding: theme.spacing(2),
    },
    radioGroup: {
      '&.MuiFormGroup-root': {
        flexWrap: 'nowrap',
      },
      '& .MuiFormControlLabel-root': {
        marginRight: 8,
        flexWrap: 'nowrap',
      },
      '& .MuiSvgIcon-root': {
        width: 30,
        height: 30,
      },
      '& .MuiTypography-body1': {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    label: {
      marginRight: theme.spacing(1),
    },
    vertical: {
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'RadioGroupField' },
);

export const RadioGroupField = ({
  onChange,
  options,
  label,
  value,
  vertical = false,
  ...props
}: IRadioGroupFieldProps) => {
  const classes = useStyles();
  const handleRadioClick = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <Grid container alignItems="center" className={classes.wrapper}>
      <Grid
        item
        xs={vertical ? 12 : 'auto'}
        className={clsx({ [classes.vertical]: vertical })}
      >
        <Typography variant="h4" color="primary" className={classes.label}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            defaultValue={value || ''}
            onChange={handleRadioClick}
            className={classes.radioGroup}
          >
            {options.map((o, idx) => (
              <FormControlLabel
                value={o.value || o.label + '-' + idx}
                control={<Radio color="primary" />}
                label={o.label}
                key={o.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};
