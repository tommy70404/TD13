import React from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../ui/PageWrapper';
import { Box, Grid, Container, Typography, IconButton } from '@material-ui/core';
import { PaperButton } from '../ui/Button';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    cardContainer: {
      height: 'calc(100vh - 200px)',
      padding: '0 100px',
    },
  }),
  { name: 'TDLocationListPage' },
);

const OPTIONS = [
  { label: 'B123', to: '/TD/locations/B123' },
  { label: 'S123', to: '/TD/locations/S123' },
  { label: 'S45', to: '/TD/locations/S45' },
  { label: 'S67', to: '/TD/locations/S67' },
];


export const TDLocationListPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const handleClick = (target: string) => {
    history.push(target);
  };

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            <Grid item container xs wrap="nowrap" alignItems="center">
              <Typography color="primary" variant="h3">
                位置圖
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" className={classes.cardContainer}>
            {OPTIONS.map(o => (
              <PaperButton onClick={() => handleClick(o.to)} key={o.label}>
                {o.label}
              </PaperButton>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
