import React from 'react';
import { makeStyles, Grid, Select, MenuItem } from '@material-ui/core';

interface ISelectFieldField {
  value: any;
  onChange: (v: any) => void;
  options: {
    value: any;
    label: string;
  }[];
  defaultText?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    selectField: {
      width: 100,
      '& .MuiInputBase-input': {
        textAlign: 'center',
      },
      '& fieldset': {
        border: 'none',
      },
    },
  }),
  { name: 'SelectFieldField' },
);

export const SelectField = ({
  value,
  options,
  defaultText,
  onChange,
  ...props
}: ISelectFieldField) => {
  const classes = useStyles();

  const handleClick = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Select
        value={value}
        defaultValue=""
        displayEmpty
        variant="outlined"
        onClick={handleClick}
        className={classes.selectField}
        {...props}
      >
        <MenuItem value="" disabled>
          {defaultText || 'N'}
        </MenuItem>
        {options.map(o => (
          <MenuItem value={o.value} key={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};
