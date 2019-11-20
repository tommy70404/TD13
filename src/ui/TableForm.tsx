import React from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(
  theme => ({
    'overview-wrapper': {
      marginBottom: '8px',
      textAlign: 'center',
      padding: theme.spacing(1.5)
    },
    'overview-container': {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 4,
      marginLeft: 4,
    },
    'overview-header': {
      background: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.divider),
      '& > div': {},
    },
    'overview-row': {
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        height: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
      },
      '&& > div:last-child': {
        padding: '2px 0',
        borderRight: 'none',
      },
    },
    label: { width: 'auto', marginRight: theme.spacing(2.5) },
    tableLabel: {
      color: theme.palette.grey[700],
    },
    vertical: {
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'TableFrom' },
);

interface ITableFormProps {
  label: string;
  fields: {
    label?: string;
    control: () => JSX.Element;
  }[];
  vertical?: boolean;
}

export const TableForm = (props: ITableFormProps) => {
  const classes = useStyles();
  return (
    <Grid container className={classes['overview-wrapper']}>
      <Grid
        item
        container
        sm={props.vertical ? 12 : 'auto'}
        alignItems="center"
        className={clsx(classes.label, { [classes.vertical]: props.vertical })}
      >
        <Typography variant="h4" color="primary">
          {props.label}
        </Typography>
      </Grid>
      <Grid
        item
        container
        sm
        justify="center"
        className={classes['overview-container']}
      >
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          wrap="nowrap"
          className={classes['overview-header']}
        >
          {props.fields.map(f => (
            <Grid item xs key={f.label}>
              <Typography variant="h5" className={classes.tableLabel}>
                {f.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          wrap="nowrap"
          className={classes['overview-row']}
        >
          {props.fields.map(f => (
            <Grid item xs key={f.label}>
              {f.control()}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
