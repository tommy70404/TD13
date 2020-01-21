import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import Fullscreen from 'react-full-screen';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  AppBar,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Search from '@material-ui/icons/Search';

import { MaintRangeForm } from '../components/forms/formV2/MaintRangeForm';
import { MultiTextField } from '../ui/TextField';
import { venderOptions } from '../data/comm';
import { SelectField } from '../ui/SelectField';
import { MaintForm } from '../components/forms/formV2/MaintForm';
import { MaterialCumspForm } from '../components/forms/formV2/MaterialCumspForm';
import { MiscellaneousForm } from '../components/forms/formV2/MiscellaneousForm';
import { FinishDataForm } from '../components/forms/formV2/FinishDataForm';
import { DateField } from '../ui/DateField';
import { PageWrapper } from '../ui/PageWrapper';
import { PopTdInfoButton } from '../components/popup/PopTdInfoButton';
import { NavigatorBar } from '../ui/NavigatorBar';

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
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    flatBtn: {
      color: 'white',
      boxShadow: theme.shadows[0],
      borderRadius: 4,
      fontSize: theme.typography.h4.fontSize,
      padding: '6px 12px',
    },
    fieldSamll: {
      '& .MuiInputBase-root': {
        width: 110,
      },
    },
    // fieldAdornment: {
    //   backgroundColor: theme.palette.primary.main,
    //   width: 91,
    //   color: 'white',
    //   borderBottomRightRadius: theme.shape.borderRadius,
    //   borderTopRightRadius: theme.shape.borderRadius,
    //   border: `3px solid ${theme.palette.primary.main}`,
    // },
    colorBorderField: {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `3px solid ${theme.palette.primary.main}`,
        marginRight: -3,
      },
      '& .MuiInputBase-root': {
        height: 60,
      },
      '& .MuiInputBase-input::placeholder': {
        color: theme.palette.primary.main,
        opacity: 1,
      },
    },
    btn: {
      fontWeight: theme.typography.fontWeightBold,
      margin: `0 ${theme.spacing(2.5)}px`,
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.grey[700],
      width: 226,
      height: 56,
    },
  }),
  { name: 'Form2Page' },
);

// const dataReducers = (state, { type, payload }) => {
//   switch (type) {
//     default:
//       return { ...state, [payload.key]: payload.value };
//   }
// };

// export const dataCtx = createContext(null);

export const FormV2Page = () => {
  // const [data, updateData] = useContext(dataCtx);
  // const [isFull, setFull] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { section_id, td_id } = useParams();
  // const [td, order] = (section_id && section_id.split('-')) || [];
  // const dataReducer = useReducer(dataReducers, {});

  // const handleChange = (k: string) => (v: any) => {
  //   updateData({ type: '', payload: { key: k, vaule: v } });
  // };

  return (
    <>
      {/* <dataCtx.Provider value={dataReducer}> */}
      {/* <Fullscreen enabled={isFull} onChange={isFull => setFull(isFull)}> */}
      <PageWrapper title="TD13 耐火材管理系統" />

      <Box padding="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <NavigatorBar title={`${section_id} TD-${td_id} 耐火材料內襯修護履歷`} to={`/maintenance/new/${section_id}/menu`}>
            <Grid container justify="space-between" alignItems="center" spacing={3}>
              <Grid item xs="auto" style={{ width: 186 }}>
                <PopTdInfoButton />
              </Grid>
              <Grid item xs="auto" style={{ width: 186 }}>
                <Button color="primary" variant="contained" fullWidth className={classes.flatBtn}>
                  材料表
                </Button>
              </Grid>
              <Grid item xs="auto" style={{ width: 186 }}>
                <Button color="primary" variant="contained" fullWidth className={classes.flatBtn}>
                  廠商代號
                </Button>
              </Grid>
            </Grid>
          </NavigatorBar>

          {/* <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            <Grid item container xs wrap="nowrap" alignItems="center">
              <IconButton
                size="small"
                onClick={() => {
                  history.goBack();
                }}
              >
                <KeyboardArrowLeft color="primary" fontSize="large" style={{ fontSize: '3.5rem' }} />
              </IconButton>
              <Typography color="primary" variant="h3">
                {td} TD-{order} 耐火材料內襯修護履歷
              </Typography>
            </Grid> */}

          {/* 2st section */}
          <Grid container justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            {/* 1st row */}
            <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
              <Grid item xs>
                <MultiTextField
                  label="T/D 編號"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'NN' }]}
                  vertical
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <MultiTextField
                  label="爐代"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'NNN', suffix: '代' }]}
                  vertical
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <MultiTextField
                  label="回數"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'NN', suffix: '回' }]}
                  vertical
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <DateField label="下線全修日期" placeholder="YYYY-MM-DD" />
                {/* <MultiTextField
                    label="下線全修日期"
                    // state={state}
                    // onChange={()=>()}
                    fields={[{ placeholder: 'YYYY-MM-DD' }]}
                    vertical
                    fullWidth
                  /> */}
              </Grid>
            </Grid>
            {/* 2st row */}
            <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
              <Grid item xs>
                <DateField label="澆注時間" placeholder="YYYY-MM-DD" />
              </Grid>
              <Grid item xs>
                <MultiTextField
                  label="澆注數量"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'NNNN', suffix: 'kg' }]}
                  vertical
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <SelectField
                  label="材料廠商"
                  // onChange={()=>()}
                  options={venderOptions}
                  defaultText="廠商中文名稱"
                  variant="outlined"
                  vertical
                  autoWidth
                  border
                />
              </Grid>
            </Grid>
          </Grid>
          {/* 3rd section */}
          <Grid container justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            {/* 1st row */}
            <Grid item container xs={12}>
              <Grid item container xs={6}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.flatBtn}
                  style={{ marginRight: 20, width: 186 }}
                >
                  {' < 前筆維護單'}
                </Button>
                <Button color="default" variant="contained" className={classes.flatBtn} style={{ width: 186 }}>
                  {'次筆維護單 > '}
                </Button>
              </Grid>
              <Grid item container wrap="nowrap" justify="flex-end" xs={6}>
                <TextField
                  // value={search}
                  // onChange={(v: string) => setSearch(v)}
                  variant="outlined"
                  className={classes.colorBorderField}
                  placeholder="請輸入維修單序號"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton disabled>
                          <Search color="primary" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {/* 2nd row */}
            <Grid item container xs={12}>
              <MaintForm />
            </Grid>
            {/* 3rd row */}
            <Grid item container xs={12}>
              <MaintRangeForm />
            </Grid>
            {/* 4th row */}
            <Grid item container xs={12}>
              <MaterialCumspForm />
            </Grid>
            {/* 5th row */}
            <Grid item container xs={12}>
              <MiscellaneousForm />
            </Grid>
            {/* 5th row */}
            <Grid item container xs={12}>
              <FinishDataForm />
            </Grid>
          </Grid>
          {/* footer */}
          <Grid container justify="space-between">
            <Button variant="contained" className={classes.btn}>
              取消
            </Button>
            <Grid item sm="auto" style={{ width: 'auto' }}>
              <Button variant="contained" className={classes.btn}>
                暫存
              </Button>
              <Button color="primary" variant="contained" className={classes.btn}>
                送出
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* </Fullscreen> */}
      {/* </dataCtx.Provider> */}
    </>
  );
};

const WidthAutoGrid = styled(Grid)`
  width: auto;
`;
