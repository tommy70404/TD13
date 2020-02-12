import React, { useState } from 'react';
import { makeStyles, Grid, Select, MenuItem, Typography, PropTypes } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';
import clsx from 'clsx';
import { SimplePaletteColorOptions } from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

interface ISelectFieldField extends SelectProps {
  value?: any;
  onChange?: (v: any) => void;
  options: {
    value: any;
    label: string;
  }[];
  themeColor?: PropTypes.Color;
  label?: string;
  defaultText?: string;
  children?: React.ReactNode;
  vertical?: boolean;
  border?: boolean;
  dense?: boolean;
  center?: boolean;
  transparent?: boolean;
}

const useStyles = makeStyles(
  theme =>
    ({
      fieldWrapper: {
        padding: ({ dense }: any) => theme.spacing(dense ? 0 : 1, 1),
      },
      fieldBase: {
        width: '100%',
        minWidth: 100,
        '&& .MuiSelect-root': {
          boxSizing: 'border-box',
          padding: '14px 8px',
          height: 45,
          color: ({ themeColor }: any) =>
            themeColor
              ? (theme.palette[themeColor as keyof PaletteOptions] as SimplePaletteColorOptions).main
              : undefined,
          backgroundColor: ({ transparent }: any) => (transparent ? 'transparent' : theme.palette.background.paper),
          '&.placeholder': {
            color: '#bbbbbb',
          },
        },
      },
      selectField: {
        '& .MuiInputBase-input': {
          textAlign: ({ center }: any) => (center ? 'center' : 'left'),
          height: 'auto',
          color: theme.palette.text.primary,
        },
        '& .MuiSelect-icon': {
          color: theme.palette.text.primary,
          right: 0,
        },
      },
      nonborder: {
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
    } as any),
  { name: 'SelectFieldField' },
);

export const SelectField = ({
  value,
  options,
  defaultText,
  onChange,
  label,
  themeColor,
  vertical = false,
  border = false,
  dense = false,
  center = false,
  transparent = false,
  ...props
}: ISelectFieldField) => {
  const classes: any = useStyles({ center, dense, transparent, themeColor });
  const [state, setstate] = useState('');

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
    setstate(e.target.value);
  };

  return (
    <Grid container justify={center ? 'center' : 'flex-start'} alignItems="center" className={classes.fieldWrapper}>
      {label && (
        <Grid item xs={vertical ? 12 : undefined} style={{ marginBottom: 10 }}>
          <Typography variant="h4" color="primary">
            {label}
          </Typography>
        </Grid>
      )}
      <Select
        margin="none"
        defaultValue={value || ''}
        displayEmpty
        variant="outlined"
        onChange={handleChange}
        className={clsx(classes.fieldBase, classes.selectField, {
          [classes.nonborder]: !border,
          [classes['field-dense']]: dense,
        })}
        inputProps={{
          className: clsx({ placeholder: state === '' }),
        }}
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
