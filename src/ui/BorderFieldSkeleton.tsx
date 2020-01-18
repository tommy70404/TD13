import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SelectField } from './SelectField';

interface IBorderFieldSkeletonProps {
  title: string;
  field: JSX.Element;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      width: 'auto',
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
    },
    title: {
      padding: theme.spacing(0, 2),
      // borderTopLeftRadius: theme.shape.borderRadius,
      // borderBottomLeftRadius: theme.shape.borderRadius,
      display: 'flex',
      alignItems: 'center',
      color: 'white',
    },
    fieldWrapper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(0, 4),
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  }),
  { name: 'BorderFieldSkeleton' },
);

export const BorderFieldSkeleton = ({ title, field }: IBorderFieldSkeletonProps) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.title}>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item className={classes.fieldWrapper}>
        {field}
      </Grid>
    </Grid>
  );
};
