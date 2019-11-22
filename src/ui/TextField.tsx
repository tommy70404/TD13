import React from 'react';
import { Grid, Typography, Box, TextField, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

type IMultiTextFieldProps = {
  label?: string;
  state?: any;
  onChange?: (k: string) => (v: any) => void;
  fields: {
    placeholder: string;
    prefix?: string;
    suffix?: string;
  }[];
  vertical?: boolean;
  fullWidth?: boolean;
  dense?: boolean;
  textCenter?: boolean;
  inputProps?: any;
  style?: React.CSSProperties;
};
// notes: it's uncontroll field
const useStyles = makeStyles(
  theme => ({
    filedWrapper: {
      padding: theme.spacing(1),
    },
    field: {
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.default,
      },
      '& .MuiInputBase-input': {
        boxSizing: 'border-box',
        height: 45,
      },
    },
    'field-dense': {
      '& .MuiInputBase-input': {
        boxSizing: 'border-box',
        height: 32,
      },
    },
    'text-center': {
      '& .MuiInputBase-input': {
        textAlign: 'center',
      },
    },
  }),
  { name: 'MultiTextField' },
);

export const MultiTextField = ({
  label,
  onChange,
  state,
  fields,
  vertical = false,
  textCenter = false,
  dense = false,
  inputProps,
  ...props
}: IMultiTextFieldProps) => {
  const classes = useStyles();

  const handleChange = (k: string) => (e: any) => {
    onChange && onChange(k)(e.target.value);
  };

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
        {fields.map((f, idx) => (
          <React.Fragment key={idx}>
            <Box
              className={clsx(classes.field, {
                [classes['text-center']]: textCenter,
                [classes['field-dense']]: dense,
              })}
              marginLeft={idx === 0 ? 0 : 1}
              width={'100%'}
              // clone
            >
              <Grid item container wrap="nowrap" alignItems="center" spacing={2}>
                {f.prefix && (
                  <Grid item xs>
                    <Typography variant="h3" color="primary">
                      {f.prefix}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs>
                  <TextField
                    // value={state[label + '-' + idx] || ''}
                    defaultValue={(state && state[label + '-' + idx]) || ''}
                    variant="outlined"
                    placeholder={f.placeholder}
                    onBlur={handleChange(label + '-' + idx)}
                    inputProps={inputProps}
                    {...props}
                  />
                </Grid>
                {f.suffix && (
                  <Grid item xs>
                    <Typography variant="h3" color="primary">
                      {f.suffix}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};
