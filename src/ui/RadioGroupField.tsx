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
      '& .MuiFormControlLabel-root': {
        // alignItems: 'flex-end',
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
      marginRight: theme.spacing(2.5),
    },
  }),
  { name: 'RadioGroupField' },
);

export const RadioGroupField = ({
  onChange,
  options,
  label,
  ...props
}: IRadioGroupFieldProps) => {
  const classes = useStyles();
  const handleRadioClick = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Typography variant="h4" className={classes.label}>
        {label}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          onChange={handleRadioClick}
          className={classes.radioGroup}
        >
          {options.map((o, idx) => (
            <FormControlLabel
              value={o.value || o.label + idx}
              control={<Radio />}
              label={o.label}
              style={{ marginLeft: 12 }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};
