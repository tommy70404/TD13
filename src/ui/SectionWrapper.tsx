import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

interface ISectionWrapperProps {
  icon?: JSX.Element;
  title?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    titleRow: {
      marginBottom: theme.spacing(2),
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    contentDiv: {
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(5),
      width: '100%',
      height: '100%',
    },
  }),
  { name: 'SectionWrapper' },
);

export const SectionWrapper = ({
  icon,
  title,
  ...props
}: ISectionWrapperProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item container xs={12} alignItems="center" className={classes.titleRow}>
        <Grid item className={classes.icon}>
          {icon}
        </Grid>
        <Grid item>
          <Typography variant="h3" color="primary">
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <div className={classes.contentDiv}>{props.children}</div>
      </Grid>
    </Grid>
  );
};
