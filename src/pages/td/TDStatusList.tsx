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
  { name: 'TDStatusList' },
);

enum columnsMap {
  'updated_at' = '最近更新時間',
  'id' = 'TD號碼',
  'location' = 'TD位置',
  'status' = 'TD狀態',
  // 'operate' = '前往頁面',
}

const FAKE_DATA = [
  {
    updated_at: Date.now() - Math.round(Math.random() * 2000000000),
    id: 1,
    location: '養身區',
    status: '養身時間已過 00：01：53',
    operate: '',
  },
  {
    updated_at: Date.now() - Math.round(Math.random() * 2000000000),
    id: 21,
    location: '使用中',
    status: '工作項目-上蓋送出',
    operate: '',
  },
  {
    updated_at: Date.now() - Math.round(Math.random() * 2000000000),
    id: 12,
    location: '預熱區',
    status: '預熱已完成',
    operate: '',
  },
  {
    updated_at: Date.now() - Math.round(Math.random() * 2000000000),
    id: 5,
    location: '備用區',
    status: '待指派',
    operate: '',
  },
  {
    updated_at: Date.now() - Math.round(Math.random() * 2000000000),
    id: 7,
    location: '備用區',
    status: '待指派',
    operate: '',
  },
  {
    updated_at: Date.now() - Math.round(Math.random() * 2000000000),
    id: 23,
    location: '備用區',
    status: '待指派',
    operate: '',
  },
];

const searchableKeys = ['updated_at', 'id', 'location', 'status'];

export const TDStatusList = () => {
  const [keyword, setKeyword] = useState('');
  const fuse = new Fuse(FAKE_DATA, {
    keys: searchableKeys,
  });
  const filteredList = keyword === '' ? FAKE_DATA : fuse.search(keyword);

  const classes = useStyles();
  const history = useHistory();
  const { section_id } = useParams();

  const handleClick = (target: string) => {
    history.push(target);
  };

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
      const idIdx = Object.keys(columnsMap).findIndex(key => key === 'id');

      if (idIdx !== -1) {
        const TDId = rowData[idIdx];
        history.push(`/TD/status/${section_id}/${TDId}`);
      }
    },
  };
  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          {/* 1st section */}
          <NavigatorBar title={` ${section_id} TD 狀態列表`} to="/TD/status">
            <BorderFieldSkeleton
              title="查詢"
              field={
                <TextField
                  onChange={(e: any) => {
                    setKeyword(e.target.value);
                  }}
                  variant="standard"
                  className={classes.searchField}
                  placeholder="請輸入TD號碼"
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
