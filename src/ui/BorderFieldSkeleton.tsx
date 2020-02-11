import React from 'react';
import { Grid, Typography, PropTypes } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SelectField } from './SelectField';
import { PaletteOptions, SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';

interface IBorderFieldSkeletonProps {
  title: string;
  field: JSX.Element;
  color?: PropTypes.Color;
  reverse?: boolean;
}

const useStyles = makeStyles(
  theme =>
    ({
      container: {
        width: 'auto',
        borderColor: ({ color }: any) =>
          (theme.palette[color as keyof PaletteOptions] as SimplePaletteColorOptions).main,
        backgroundColor: ({ color }: any) =>
          (theme.palette[color as keyof PaletteOptions] as SimplePaletteColorOptions).main,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: theme.shape.borderRadius,
        height: 54,
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
        padding: theme.spacing(0, 0),
        display: 'flex',
        borderTopRightRadius: ({ reverse }: any) => (reverse ? 0 : theme.shape.borderRadius),
        borderBottomRightRadius: ({ reverse }: any) => (reverse ? 0 : theme.shape.borderRadius),
        borderTopLeftRadius: ({ reverse }: any) => (reverse ? theme.shape.borderRadius : 0),
        borderBottomLeftRadius: ({ reverse }: any) => (reverse ? theme.shape.borderRadius : 0),
        '& > *': {
          margin: 'auto auto',
        },
      },
    } as any),
  { name: 'BorderFieldSkeleton' },
);

export const BorderFieldSkeleton = ({
  title,
  field,
  color = 'primary',
  reverse = false,
}: IBorderFieldSkeletonProps) => {
  const classes: any = useStyles({ reverse, color });
  return (
    <Grid container className={classes.container}>
      {!reverse && (
        <Grid item className={classes.title}>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item className={classes.fieldWrapper}>
        {field}
      </Grid>
      {reverse && (
        <Grid item className={classes.title}>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
