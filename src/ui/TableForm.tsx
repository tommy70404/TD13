import React from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(
  theme => ({
    'overview-wrapper': {
      marginBottom: '8px',
      textAlign: 'center',
      padding: theme.spacing(1.5),
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
    'bg-white': {
      background: theme.palette.background.default,
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
  fields?: {
    label?: string;
    control: () => JSX.Element;
  }[];
  fieldGroup?: {
    label: string;
    controlGroup: {
      label: string;
      control: () => JSX.Element;
    }[];
  }[];
  label?: string;
  vertical?: boolean;
}

export const TableForm = ({ label, vertical, fields, fieldGroup, ...props }: ITableFormProps) => {
  const classes = useStyles();
  return (
    <Grid container className={classes['overview-wrapper']}>
      {label && (
        <Grid
          item
          container
          sm={vertical ? 12 : 'auto'}
          alignItems="center"
          className={clsx(classes.label, {
            [classes.vertical]: vertical,
          })}
        >
          <Typography variant="h4" color="primary">
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item container sm justify="center" className={classes['overview-container']}>
        {fieldGroup && (
          <>
            <Grid
              container
              item
              xs={12}
              justify="center"
              alignItems="center"
              wrap="nowrap"
              className={classes['overview-header']}
            >
              {fieldGroup.map((f, i) => (
                <Grid item xs key={i}>
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
              {fieldGroup
                .reduce(
                  (acc, f) => {
                    const labelArr = f.controlGroup.reduce((acc, c) => acc.concat(c.label), [] as string[]);
                    return acc.concat(labelArr);
                  },
                  [] as string[],
                )
                .map((label, i) => (
                  <Grid item xs key={i}>
                    <Typography variant="h5" className={classes.tableLabel} key={label}>
                      {label}
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
              className={clsx(classes['overview-row'], classes['bg-white'])}
            >
              {fieldGroup
                .reduce(
                  (acc, f) => {
                    const controlArr = f.controlGroup.reduce(
                      (acc, c) => acc.concat(c.control),
                      [] as (() => JSX.Element)[],
                    );
                    return acc.concat(controlArr);
                  },
                  [] as (() => JSX.Element)[],
                )
                .map((c, i) => (
                  <Grid item xs key={i}>
                    {c()}
                  </Grid>
                ))}
            </Grid>
          </>
        )}

        {fields && (
          <>
            <Grid
              container
              item
              xs={12}
              justify="center"
              alignItems="center"
              wrap="nowrap"
              className={classes['overview-header']}
            >
              {fields.map((f, i) => (
                <Grid item xs key={i}>
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
              {fields.map((f, i) => (
                <Grid item xs key={i}>
                  {f.control()}
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};
