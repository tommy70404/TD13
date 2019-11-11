import React from 'react';
import {
  makeStyles,
  Grid,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';

interface ISelectFieldField extends SelectProps {
  value: any;
  onChange: (v: any) => void;
  options: {
    value: any;
    label: string;
  }[];
  label?: string;
  defaultText?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    selectField: {
      minWidth: 150,
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
  label,
  ...props
}: ISelectFieldField) => {
  const classes = useStyles();

  const handleClick = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <Grid container justify="center" alignItems="center">
      {label && (
        <Typography variant="h4" color="primary">
          {label}
        </Typography>
      )}
      <Select
        defaultValue={value || ''}
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
