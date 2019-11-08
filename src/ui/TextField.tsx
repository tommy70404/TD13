import React from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  makeStyles,
} from '@material-ui/core';

interface IMultiTextFieldProps {
  value: any;
  onChange: (v: any) => void;
  label?: string;
  placeholder: string;
}

const useStyles = makeStyles(
  theme => ({
    field: {
      marginLeft: theme.spacing(2.5),
    },
  }),
  { name: 'MultiTextField' },
);

export const LabelTextField = ({ label, ...props }: IMultiTextFieldProps) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      {label && <Typography variant="h4">{label}</Typography>}
      <Box className={classes.field} clone>
        <TextField variant="outlined" {...props} />
      </Box>
    </Grid>
  );
};
