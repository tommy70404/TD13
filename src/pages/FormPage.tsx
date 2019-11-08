import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  AppBar,
  Typography,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';
import { RestSteelForm } from '../components/forms/RestSteelForm';
import { MultiTextField } from '../ui/TextField';
import { RadioGroupField } from '../ui/RadioGroupField';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(4),
    },
    tabs: {
      '& .MuiTab-root': {
        fontSize: theme.typography.h5.fontSize,
        minWidth: 200,
        zIndex: 10,
        fontWeight: theme.typography.fontWeightBold,
        transition: '.5s all ease-in-out',
      },
      '& .Mui-selected': {
        color: theme.palette.getContrastText(theme.palette.primary.main),
      },
    },
    tabRenderArea: {
      borderTop: `2px solid ${theme.palette.primary.main}`,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    btn: {
      fontWeight: theme.typography.fontWeightBold,
      margin: `0 ${theme.spacing(2.5)}px`,
      fontSize: theme.typography.h6.fontSize,
      width: 226,
      height: 56,
    },
  }),
  { name: 'formPage' },
);

export const FormPage = () => {
  const [state, setState] = useState({ tab: '殘鋼處理' });

  const classes = useStyles();

  const handleChange = (k: string) => (v: any) =>
    setState(prev => ({ ...prev, [k]: v }));

  const renderFormSwitch = () => {
    switch (state.tab) {
      case '殘鋼處理':
        return <RestSteelForm onChange={handleChange('殘鋼處理')} />;
      // case '整修範圍':
      //   return <MaintRangeForm />;
      // case '修護塗附':
      //   return <MaintPaintForm />;
      // case '材料類別':
      //   return <MaterialCategForm />;
      default:
        return <RestSteelForm onChange={handleChange('殘鋼處理')} />;
    }
  };

  return (
    <>
      <Box padding="16px 32px" clone>
        <AppBar>
          <Typography variant="h4">B123 耐火內襯修護工作紀錄表單</Typography>
        </AppBar>
      </Box>
      <Box marginTop="84px" padding="12px" clone>
        <Container maxWidth="xl">
          {/* 1st row */}
          <Grid container className={classes.row}>
            <Grid item sm={3}>
              <MultiTextField
                onChange={handleChange('送修序號')}
                fields={[{ label: '送修序號', placeholder: 'YYYMM.NNN' }]}
              />
            </Grid>
            <Grid item sm={3}>
              <MultiTextField
                onChange={handleChange('T/D 編號')}
                fields={[{ label: 'T/D 編號', placeholder: 'NN' }]}
              />
            </Grid>
            <Grid item sm={3}>
              <MultiTextField
                onChange={handleChange('鋼種')}
                fields={[{ label: '鋼種', placeholder: 'xxx' }]}
              />
            </Grid>
            <Grid container item sm={3} alignItems="center" wrap="nowrap">
              <RadioGroupField
                label="班別"
                options={[
                  { label: '早班' },
                  { label: '午班' },
                  { label: '晚班' },
                ]}
                onChange={handleChange('班別')}
              />
            </Grid>
          </Grid>
          {/* 2nd row */}
          <Grid container wrap="nowrap" className={classes.row}>
            <Grid item container alignItems="center">
              <MultiTextField
                onChange={handleChange('送修時間')}
                fields={[
                  { label: '送修時間', placeholder: 'YYYY-MM-DD' },
                  { placeholder: 'HH:MM' },
                ]}
              />
            </Grid>
            <Grid item container alignItems="center">
              <MultiTextField
                onChange={handleChange('S/N 到除時間')}
                fields={[
                  { label: 'S/N 到除時間', placeholder: 'YYYY-MM-DD' },
                  { placeholder: 'HH:MM' },
                ]}
              />
            </Grid>
          </Grid>
          {/* 3nd row */}
          <Grid container>
            <Tabs
              value={state.tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, v) => {
                setState(prev => ({ ...prev, tab: v }));
              }}
              TabIndicatorProps={{ style: { height: '100%', zIndex: 1 } }}
              className={classes.tabs}
            >
              <Tab label="殘鋼處理" value="殘鋼處理" />
              <Tab label="整修範圍" value="整修範圍" />
              <Tab label="修護塗附" value="修護塗附" />
              <Tab label="材料類別" value="材料類別" />
            </Tabs>
          </Grid>
          <Grid container className={clsx(classes.row, classes.tabRenderArea)}>
            {renderFormSwitch()}
          </Grid>
          <Grid container justify="space-between" className={classes.row}>
            <Button variant="contained" className={classes.btn}>
              取消
            </Button>
            <Grid item sm="auto" style={{ width: 'auto' }}>
              <Button variant="contained" className={classes.btn}>
                暫存
              </Button>
              <Button
                color="primary"
                variant="contained"
                className={classes.btn}
              >
                送出
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
