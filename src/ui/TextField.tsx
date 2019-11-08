import React from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  makeStyles,
} from '@material-ui/core';

interface IMultiTextFieldProps {
  label: string;
  state: any;
  onChange: (k: string) => (v: any) => void;
  fields: {
    placeholder: string;
  }[];
}
// notes: it's uncontroll field
const useStyles = makeStyles(
  theme => ({
    field: {
      marginLeft: theme.spacing(2.5),
    },
  }),
  { name: 'MultiTextField' },
);

export const MultiTextField = ({
  label,
  onChange,
  state,
  fields,
  ...props
}: IMultiTextFieldProps) => {
  const classes = useStyles();

  const handleChange = (k: string) => (e: any) => {
    onChange(k)(e.target.value);
  };

  return (
    <Grid container alignItems="center">
      {label && <Typography variant="h4">{label}</Typography>}
      {fields.map((f, idx) => (
        <React.Fragment key={idx}>
          <Box className={classes.field} clone>
            <TextField
              // value={state[label + '-' + idx] || ''}
              defaultValue={state[label + '-' + idx] || ''}
              variant="outlined"
              placeholder={f.placeholder}
              onBlur={handleChange(label + '-' + idx)}
              {...props}
            />
          </Box>
        </React.Fragment>
      ))}
    </Grid>
  );
};
