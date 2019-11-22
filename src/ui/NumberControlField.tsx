import React from 'react';
import { Button, makeStyles, Grid, TextField } from '@material-ui/core';

interface INumberControlField {
  value: any;
  onChange: (v: any) => void;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    textInput: {
      width: 60,
      '& .MuiInputBase-root': {
        height: 40,
      },
      '& .MuiInputBase-input': {
        textAlign: 'center',
      },
    },
    btn: {
      width: 35,
      height: 40,
      padding: 0,
      marginRight: 4,
      marginLeft: 4,
      // color: theme.palette.grey[700],
      fontWeight: theme.typography.h5.fontWeight,
      fontSize: theme.typography.h5.fontSize,
    },
  }),
  { name: 'NumberControlField' },
);

export const NumberControlField = ({ value, onChange, ...props }: INumberControlField) => {
  const classes = useStyles();

  const handleClick = (k: string) => () => {
    let prevValue = value || 0;
    onChange((prevValue += parseInt(k)));
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Button variant="contained" size="small" onClick={handleClick('-10')} className={classes.btn}>
        -10
      </Button>
      <Button variant="contained" size="small" onClick={handleClick('-1')} className={classes.btn}>
        -
      </Button>
      <TextField
        variant="outlined"
        margin="dense"
        disabled
        value={(value || 0).toString()}
        className={classes.textInput}
      />
      <Button variant="contained" size="small" onClick={handleClick('+1')} className={classes.btn}>
        +
      </Button>
      <Button variant="contained" size="small" onClick={handleClick('+10')} className={classes.btn}>
        +10
      </Button>
    </Grid>
  );
};
