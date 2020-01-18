import React from 'react';
import { makeStyles, Grid, Select, MenuItem, Typography } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';
import clsx from 'clsx';

interface ISelectFieldField extends SelectProps {
  value?: any;
  onChange?: (v: any) => void;
  options: {
    value: any;
    label: string;
  }[];
  label?: string;
  defaultText?: string;
  children?: React.ReactNode;
  vertical?: boolean;
  border?: boolean;
  dense?: boolean;
}

const useStyles = makeStyles(
  theme => ({
    fieldBase: {
      width: '100%',
      minWidth: 100,
      '& .MuiSelect-root': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    selectField: {
      '& .MuiInputBase-input': {
        textAlign: 'center',
        height: 'auto',
        color: theme.palette.primary.main,
      },
      '& .MuiSelect-icon': {
        color: theme.palette.primary.main,
        right: 0,
      },
      '& fieldset': {
        border: 'none',
      },
    },
    'field-dense': {
      '& .MuiSelect-root': {
        boxSizing: 'border-box',
        height: 32,
        padding: '6px 24px 6px 0',
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
  vertical = false,
  border = false,
  dense = false,
  ...props
}: ISelectFieldField) => {
  const classes = useStyles();

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <Grid container justify="center" alignItems="center">
      {label && (
        <Grid item xs={vertical ? 12 : undefined} style={{ marginBottom: 10 }}>
          <Typography variant="h4" color="primary">
            {label}
          </Typography>
        </Grid>
      )}
      <Select
        defaultValue={value || ''}
        displayEmpty
        variant="outlined"
        onChange={handleChange}
        className={clsx(classes.fieldBase, { [classes.selectField]: !border, [classes['field-dense']]: dense })}
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
