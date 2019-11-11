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

interface IRadioGroupFieldProps {
  value: any;
  onChange: (v: any) => void;
  options: {
    value?: any;
    label: string;
  }[];
  label?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
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
  }),
  { name: 'RadioGroupField' },
);

export const RadioGroupField = ({
  onChange,
  options,
  label,
  value,
  ...props
}: IRadioGroupFieldProps) => {
  const classes = useStyles();
  const handleRadioClick = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Typography variant="h4" color="primary" className={classes.label}>
        {label}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          defaultValue={value}
          onChange={handleRadioClick}
          className={classes.radioGroup}
        >
          {options.map((o, idx) => (
            <FormControlLabel
              value={o.value || o.label + '-' + idx}
              control={<Radio />}
              label={o.label}
              key={o.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};
