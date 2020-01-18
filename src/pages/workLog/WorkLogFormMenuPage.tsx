import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../../ui/PageWrapper';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { PaperButton } from '../../ui/Button';

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
  { name: 'WorkLogFormMenuPage' },
);

export const WorkLogFormMenuPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const handleClick = (target: string) => {
    if (target) {
      history.push(target);
    }
  };

  const OPTIONS = [
    { label: '工作紀錄單', to: `/maintenance/work_log/${id}/form` },
    { label: '工作紀錄單\n(B1+B2)', to: '' },
    { label: '上線前檢查表', to: '' },
  ];

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            <Grid item container xs wrap="nowrap" alignItems="center">
              <Typography color="primary" variant="h3">
                工作紀錄單-欲填表單選擇
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" spacing={3} className={classes.cardContainer}>
            {OPTIONS.map(o => (
              <Grid item key={o.label}>
                <PaperButton onClick={() => handleClick(o.to)}>{o.label}</PaperButton>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
