import React, { useState } from 'react';
import clsx from 'clsx';
import Fullscreen from 'react-full-screen';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  AppBar,
  Typography,
  Grid,
  Radio,
  Tabs,
  Tab,
  Button,
  IconButton,
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { RestSteelForm } from '../components/forms/RestSteelForm';
import { MaintRangeForm } from '../components/forms/MaintRangeForm';
import { MultiTextField } from '../ui/TextField';
import { RadioGroupField } from '../ui/RadioGroupField';

const useStyles = makeStyles(
  theme => ({
    '@global': {
      '.fullscreen-enabled': {
        background: 'white',
        overflow: 'scroll',
      },
    },
    row: {
      marginBottom: theme.spacing(2),
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
        color: theme.palette.common.white,
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
      color: theme.palette.grey[700],
      width: 226,
      height: 56,
    },
    fieldSamll: {
      '& .MuiInputBase-root': {
        width: 110,
      },
    },
  }),
  { name: 'FormPage' },
);

export const FormPage = () => {
  const [state, setState] = useState<any>({ tab: '殘鋼處理' });
  const [isFull, setFull] = useState(false);
  console.log('state', state);
  const classes = useStyles();

  const handleChange = (k: string) => (v: any) => {
    setState((prev: any) => ({ ...prev, [k]: v }));
  };

  const renderFormSwitch = () => {
    switch (state.tab) {
      case '殘鋼處理':
        return <RestSteelForm state={state} handleChange={handleChange} />;
      case '整修範圍':
        return <MaintRangeForm state={state} handleChange={handleChange} />;
      // case '修護塗附':
      //   return <MaintPaintForm />;
      // case '材料類別':
      //   return <MaterialCategForm />;
      default:
        return <RestSteelForm state={state} handleChange={handleChange} />;
    }
  };

  return (
    <>
      <Fullscreen enabled={isFull} onChange={isFull => setFull(isFull)}>
        <Box padding="0px 32px" clone>
          <AppBar position="static">
            <Grid container justify="space-between" alignItems="center">
              <Typography variant="h3" style={{ color: 'white' }}>
                B123 耐火內襯修護工作紀錄表單
              </Typography>
              <IconButton onClick={() => setFull(prev => !prev)}>
                {(isFull && <FullscreenExitIcon />) || <FullscreenIcon />}
              </IconButton>
            </Grid>
          </AppBar>
        </Box>
        <Box marginTop="12px" padding="12px" clone>
          <Container maxWidth={false}>
            {/* 1st row */}
            <Grid container spacing={2} wrap="nowrap" className={classes.row}>
              <Grid item sm="auto" style={{ width: 'auto' }}>
                <MultiTextField
                  label="送修序號"
                  state={state}
                  onChange={handleChange}
                  fields={[{ placeholder: 'YYYMM.NNN' }]}
                />
              </Grid>
              <Grid item sm="auto" style={{ width: 'auto' }}>
                <MultiTextField
                  label="T/D 編號"
                  state={state}
                  onChange={handleChange}
                  fields={[{ placeholder: 'NN' }]}
                />
              </Grid>
              <Grid
                item
                sm="auto"
                style={{ width: 'auto' }}
                className={classes.fieldSamll}
              >
                <MultiTextField
                  label="鋼種"
                  state={state}
                  onChange={handleChange}
                  fields={[{ placeholder: 'xxx' }]}
                />
              </Grid>
              <Grid
                container
                item
                sm="auto"
                alignItems="center"
                wrap="nowrap"
                style={{ width: 'auto' }}
              >
                <RadioGroupField
                  label="班別"
                  value={state['班別']}
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
                  label="送修時間"
                  state={state}
                  onChange={handleChange}
                  fields={[
                    { placeholder: 'YYYY-MM-DD' },
                    { placeholder: 'HH:MM' },
                  ]}
                />
              </Grid>
              <Grid item container alignItems="center">
                <MultiTextField
                  label="S/N 到除時間"
                  state={state}
                  onChange={handleChange}
                  fields={[
                    { placeholder: 'YYYY-MM-DD' },
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
                  setState((prev: any) => ({ ...prev, tab: v }));
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
            <Grid
              container
              className={clsx(classes.row, classes.tabRenderArea)}
            >
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
      </Fullscreen>
    </>
  );
};
