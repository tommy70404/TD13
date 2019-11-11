import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
  theme => ({
    'overview-wrapper': {
      textAlign: 'center',
    },
    'overview-container': {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 4,
      marginLeft: 4,
    },
    'overview-row-bg-dark': {
      background: theme.palette.grey[300],
      color: theme.palette.grey[700],
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
    'overview-row': {
      color: theme.palette.grey[700],
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
  }),
  { name: 'TableFrom' },
);

const fields = [
  { header: '', row_1: 'B1 + B2', row_2: 'B3' },
  {
    header: 'T/D 長 x 寬 x 高',
    row_1: '6602 x 3125 x 1815',
    row_2: '6200 x 2000 x 1760',
  },
  {
    header: '背襯材重',
    row_1: '14250 kg',
    row_2: '11500 kg',
  },
  {
    header: '鐵殼重',
    row_1: '14569 kg',
    row_2: '16300 kg',
  },
  {
    header: '鋼液重',
    row_1: '25000 kg',
    row_2: '25000 kg',
  },
];

export const MaintRangeTable = () => {
  const classes = useStyles();
  return (
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
        className={classes['overview-row-bg-dark']}
      >
        {fields.map((f, idx) => (
          <Grid item xs key={idx}>
            <Typography variant="h5">{f.header}</Typography>
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
        {fields.map((f, idx) => (
          <Grid item xs key={idx}>
            <Typography variant="h5">{f.row_1}</Typography>
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
        className={classes['overview-row-bg-dark']}
      >
        {fields.map((f, idx) => (
          <Grid item xs key={idx}>
            <Typography variant="h5">{f.row_2}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
