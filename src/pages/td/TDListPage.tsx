import React from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../../ui/PageWrapper';
import { Box, Grid, Container, Typography, IconButton } from '@material-ui/core';
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
      // padding: '0 100px',
    },
  }),
  { name: 'TDListPage' },
);
interface IOptions {
  label: string;
  to: string;
}

export const TDListPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { section_id } = useParams();

  const handleClick = (target: string) => {
    history.push(target);
  };

  function optionsCreator(from: number, to: number) {
    const rangeCount = to - from + 1;
    return Array(rangeCount)
      .fill('')
      .map((e, i) => {
        const order = from + i > 9 ? `${from + i}` : `0${from + i}`;
        return { label: order, to: `/maintenance/new/${section_id}/${order}/form` };
      });
  }

  const renderOptions = (o: IOptions) => (
    <Grid item xs="auto" style={{ width: 'auto' }} key={o.label}>
      <PaperButton onClick={() => handleClick(o.to)} dense key={o.label}>
        {o.label}
      </PaperButton>
    </Grid>
  );

  const renderList = () => {
    switch (section_id) {
      case 'B123':
        return (
          <Grid container>
            <Grid item container>
              <Grid item xs={12} style={{ margin: '8px 0' }}>
                <Typography variant="h4" color="primary">
                  B1 + B2
                </Typography>
              </Grid>
              <Grid item container xs={12} justify="flex-start">
                {optionsCreator(1, 19).map(renderOptions)}
              </Grid>
              <Grid item xs={12} style={{ margin: '8px 0' }}>
                <Typography variant="h4" color="primary">
                  B3
                </Typography>
              </Grid>
              <Grid item container xs={12} justify="flex-start">
                {optionsCreator(31, 41).map(renderOptions)}
              </Grid>
            </Grid>
          </Grid>
        );
      default:
        return <>{optionsCreator(1, 20).map(renderOptions)}</>;
    }
  };

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box padding="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <Grid container>
            <NavigatorBar title={`${section_id} TD 號碼列表`} to="/maintenance/new" />

            {/* <Grid
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
                  {section_id} TD 號碼列表
                </Typography>
              </Grid>
            </Grid> */}
            <Grid item container xs={12} justify="center" alignItems="center" className={classes.cardContainer}>
              {renderList()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
