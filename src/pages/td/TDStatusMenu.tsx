import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../../ui/PageWrapper';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { PaperButton } from '../../ui/Button';
import { NavigatorBar } from '../../ui/NavigatorBar';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    cardContainer: {
      height: 'calc(100vh - 200px)',
    },
  }),
  { name: 'TDStatusMenu' },
);

const OPTIONS = [
  { label: 'B123', to: '/TD/status/B123' },
  { label: 'S123', to: '/TD/status/' },
  { label: 'S45', to: '/TD/status/' },
  { label: 'S67', to: '/TD/status/' },
];

export const TDStatusMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (target: string) => {
    history.push(target);
  };

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <NavigatorBar title="TD狀態-工區選擇" />
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
