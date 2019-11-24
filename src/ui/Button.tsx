import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';

import { ButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles(
  theme => ({
    container: {},
    innerWrapper: {
      width: 228,
      height: 136,
      padding: 2,
      borderRadius: theme.shape.borderRadius,
      color: 'white',
      border: '2px solid white',
      background: theme.palette.primary.main,
      transition: '.2s all ease-in-out',
      '&:hover': {
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        background: 'white',
      },
    },
    dense: {
      width: 220,
      height: 80,
      padding: 0,
    },
  }),
  { name: 'PaperButton' },
);

interface IPaperButtonProps extends ButtonProps {
  children: React.ReactNode;
  dense?: boolean;
}

export const PaperButton = ({ children, dense = false, ...props }: IPaperButtonProps) => {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={clsx(classes.innerWrapper, {
          [classes.dense]: dense,
        })}
      >
        <Typography color="inherit">{children}</Typography>
      </Grid>
    </Button>
  );
};
