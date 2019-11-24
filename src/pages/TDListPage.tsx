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
  { name: 'TDListPage' },
);

export const TDListPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const handleClick = (target: string) => {
    history.push(target);
  };

  const OPTIONS = Array(20)
    .fill('')
    .map((e, i) => {
      const order = i + 1 > 9 ? `${i + 1}` : `0${i + 1}`;
      return { label: order, to: `/form/${id}-${order}` };
    });

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box padding="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <Grid container>
            <Grid
              item
              container
              xs={12}
              wrap="nowrap"
              justify="space-between"
              alignItems="center"
              className={classes.row}
            >
              <Grid item container xs wrap="nowrap" alignItems="center">
                <IconButton
                  size="small"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <KeyboardArrowLeft color="primary" fontSize="large" style={{ fontSize: '2.5rem' }} />
                </IconButton>
                <Typography color="primary" variant="h3">
                  {id} TD 號碼列表
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} justify="center" alignItems="center" className={classes.cardContainer}>
              {OPTIONS.map(o => (
                <Grid item container xs={3} justify="center">
                  <PaperButton onClick={() => handleClick(o.to)} dense key={o.label}>
                    {o.label}
                  </PaperButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
