import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../../ui/PageWrapper';
import { Box, Grid, Container, Typography, TextField, IconButton } from '@material-ui/core';
import { PaperButton } from '../../ui/Button';
import { NavigatorBar } from '../../ui/NavigatorBar';
import { BorderFieldSkeleton } from '../../ui/BorderFieldSkeleton';
import { basicColumnOptions, DataTable } from '../../ui/MuiDatatable';
import { LaunchRounded } from '@material-ui/icons';
import { fmtLocalDate, fmtTWLocalDate } from '../../utils/date';
// import { useSearch } from '../../utils/searchHelper';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    bodyContainer: {
      minHeight: 600,
    },
    searchField: {
      '&.MuiTextField-root': {
        width: 232,
      },
      '& .MuiInput-underline': {
        '&::before': {
          content: 'none',
        },
        '&::after': {
          content: 'none',
        },
      },
    },
    table: {
      width: '100%',
      heigth: '100%',
    },
  }),
  { name: 'TDHistoryList' },
);

enum columnsMap {
  'updated_at' = '最近更新時間',
  'id' = 'TD號碼',
  'location' = 'TD位置',
  'status' = 'TD狀態',
  // 'operate' = '前往頁面',
}

const getFakeData = (id: string) =>
  [
    {
      id,
      updated_at: Date.now() - Math.round(Math.random() * 2000000000),
      location: '養身區',
      status: '養身時間已過 00：01：53',
      operate: '',
    },
    {
      id,
      updated_at: Date.now() - Math.round(Math.random() * 2000000000),
      location: '使用中',
      status: '工作項目-上蓋送出',
      operate: '',
    },
    {
      id,
      updated_at: Date.now() - Math.round(Math.random() * 2000000000),
      location: '預熱區',
      status: '預熱已完成',
      operate: '',
    },
    {
      id,
      updated_at: Date.now() - Math.round(Math.random() * 2000000000),
      location: '備用區',
      status: '待指派',
      operate: '',
    },
    {
      id,
      updated_at: Date.now() - Math.round(Math.random() * 2000000000),
      location: '備用區',
      status: '待指派',
      operate: '',
    },
    {
      id,
      updated_at: Date.now() - Math.round(Math.random() * 2000000000),
      location: '備用區',
      status: '待指派',
      operate: '',
    },
  ].splice(0, Math.round(Math.random() * 6));

const searchableKeys = ['updated_at', 'id', 'location', 'status'];

export const TDHistoryList = () => {
  const { section_id, td_id } = useParams();
  const FAKE_DATA = getFakeData(td_id as string);
  const [keyword, setKeyword] = useState('');
  const fuse = new Fuse(FAKE_DATA, {
    keys: searchableKeys,
  });
  const filteredList = keyword === '' ? FAKE_DATA : fuse.search(keyword);

  const classes = useStyles();
  const history = useHistory();

  const columns = Object.keys(columnsMap).map(key => {
    const basicColumn = {
      label: columnsMap[key as keyof typeof columnsMap],
      name: key,
      options: {
        ...basicColumnOptions,
      },
    };

    return basicColumn;
  });

  const data = filteredList.map(data => ({
    ...data,
    updated_at: fmtTWLocalDate(`YYY / MM / DD　HH : mm `, data.updated_at),
  }));

  const tableOptions = {
    onRowClick: (rowData: string[]) => {
      return;
    },
  };

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <NavigatorBar title={`${section_id} TD-${td_id} 歷史狀態列表`} to={`/TD/status/${section_id}`}>
            <BorderFieldSkeleton
              title="查詢"
              field={
                <TextField
                  onChange={(e: any) => {
                    setKeyword(e.target.value);
                  }}
                  variant="standard"
                  className={classes.searchField}
                  placeholder="請輸入關鍵字"
                />
              }
              reverse
            />
          </NavigatorBar>
          <Grid container justify="center" alignItems="flex-start" className={classes.bodyContainer}>
            <DataTable title="" columns={columns} data={data} options={tableOptions} className={classes.table} />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
