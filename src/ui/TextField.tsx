import React from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  makeStyles,
} from '@material-ui/core';

interface IMultiTextFieldProps {
  onChange: (v: any) => void;
  fields: {
    label?: string;
    placeholder: string;
  }[];
}

const useStyles = makeStyles(
  theme => ({
    field: {
      marginLeft: theme.spacing(2.5),
    },
  }),
  { name: 'MultiTextField' },
);

export const MultiTextField = (props: IMultiTextFieldProps) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      {props.fields.map(f => (
        <React.Fragment key={Math.random()}>
          {f.label && <Typography variant="h4">{f.label}</Typography>}
          <Box className={classes.field} clone>
            <TextField
              variant="outlined"
              placeholder={f.placeholder}
              {...props}
            />
          </Box>
        </React.Fragment>
      ))}
    </Grid>
  );
};
