import React, { useState } from 'react';
import RawNumPad from 'react-numpad';
import { Grid, Typography, Box, TextField, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';

const NumPad: any = RawNumPad;

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
    fieldWrapper: {
      padding: theme.spacing(1),
    },
    field: {
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.paper,
      },
      '& .MuiInputBase-input': {
        boxSizing: 'border-box',
        height: 45,
      },
      '& input': {
        padding: '14px 8px',
        height: 45,
        width: '100%',
        fontSize: '1.2rem',
        boxSizing: 'border-box',
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.background.paper,
        '&::placeholder': {
          color: theme.palette.grey[400],
        },
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
  // state,
  fields,
  vertical = false,
  textCenter = false,
  dense = false,
  inputProps,
  ...props
}: IMultiTextFieldProps) => {
  const [state, setstate] = useState<number[]>([]);
  const classes = useStyles();
  const theme = useTheme();

  // const handleChange = (k: string) => (e: any) => {
  //   onChange && onChange(k)(e.target.value);
  // };
  const handleChange = (o: number) => (v: any) => {
    setstate(prev => {
      prev.splice(o, 1, v);
      return [...prev];
    });
  };

  const padTheme = {
    header: {
      primaryColor: theme.palette.primary.main,
      secondaryColor: theme.palette.divider,
      highlightColor: '#FFC107',
      backgroundColor: theme.palette.primary.main,
    },
    body: {
      primaryColor: theme.palette.primary.main,
      secondaryColor: theme.palette.primary.main,
      highlightColor: '#FFC107',
      backgroundColor: '#f9f9f9',
    },
    panel: {
      backgroundColor: theme.palette.primary.main,
    },
    global: {},
  };

  return (
    <Grid container alignItems="center" className={classes.fieldWrapper}>
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
                  <Grid item xs="auto">
                    <Typography variant="subtitle1" color="textPrimary">
                      {f.prefix}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs>
                  <NumPad.Number
                    theme={padTheme}
                    value={state[idx]}
                    // defaultValue={(state && state[label + '-' + idx]) || ''}
                    variant="outlined"
                    placeholder={f.placeholder}
                    onChange={handleChange(idx)}
                    // onBlur={handleChange(label + '-' + idx)}
                    position="center"
                    inputProps={inputProps}
                    sync
                    {...props}
                  />
                </Grid>
                {f.suffix && (
                  <Grid item xs="auto">
                    <Typography variant="subtitle1" color="textPrimary">
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
