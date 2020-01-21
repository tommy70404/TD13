import React from 'react';
import { default as MuiAutocomplete, AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Grid, Typography, TextField } from '@material-ui/core';
import clsx from 'clsx';

interface IOptions {
  value: any;
  label: string;
}
type IAutocompleteProps = {
  value?: any;
  onChange?: (v: any) => void;
  options: IOptions[];
  defaultValue?: IOptions;
  label?: string;
  placeholder?: string;
  vertical?: boolean;
  dense?: boolean;
};

const useStyles = makeStyles(
  theme => ({
    filedWrapper: {
      padding: theme.spacing(1),
    },
    fieldBase: {
      width: '100%',
      minWidth: 100,
      '& .MuiInputBase-input': {
        fontSize: '1.2rem',
      },
    },
    'field-dense': {
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        boxSizing: 'border-box',
        height: 45,
        padding: '6px 24px 6px 6px',
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
        padding: '0 8px',
      },
      '& .MuiAutocomplete-tag': {
        margin: theme.spacing(0, 1),
      },
    },
  }),
  { name: 'AutocompleteField' },
);

export const AutocompleteField = ({
  label,
  vertical,
  options,
  defaultValue,
  placeholder,
  dense,
}: IAutocompleteProps) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.filedWrapper}>
      {label && (
        <Grid item xs={vertical ? 12 : undefined} style={{ marginBottom: 10 }}>
          <Typography variant="h4" color="primary">
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item container xs={12} wrap="nowrap">
        <MuiAutocomplete
          multiple
          id="fixed-tags-demo"
          options={options}
          getOptionLabel={(option: IOptions) => option.label}
          defaultValue={defaultValue}
          renderTags={(value, getTagProps) =>
            value.map((option: IOptions, index: number) => (
              <Chip label={option.label} {...getTagProps({ index })} color="primary" size="medium" key={option.label} />
            ))
          }
          style={{ width: '100%' }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              placeholder={placeholder}
              fullWidth
              className={clsx(classes.fieldBase, { [classes['field-dense']]: dense })}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
