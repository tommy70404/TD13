import React from 'react';
import { ViewListRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { SectionWrapper } from '../../../ui/SectionWrapper';
import { MultiTextField } from '../../../ui/TextField';
import { SelectField } from '../../../ui/SelectField';
import { venderOptions, TdOptions } from '../../../data/comm';
import { Table } from '../../../ui/Table';
import { AutocompleteField } from '../../../ui/AutocompleteField';

const useStyles = makeStyles(theme => ({}), { name: 'CurrentShiftTotalForm' });

const workAreaHeaders = [
  { label: '工作區域', width: 250 },
  { label: '塗附材 ( 氣密材 ) 使用量', width: 200 },
  { label: '本班塗附材剩料', width: 150 },
  { label: '本班修補材剩料', width: 150 },
];
const workAreaBody = [{ key: 'B1+B2' }, { key: 'B3' }].map((d, idx) => createWorkAreaBodyData(d, idx));

const statisticHeaders = [{ label: '統計項目', width: 300 }, { label: 'TD 號碼' }];
const statisticBody = [
  { key: 'B1+B2 殘鋼倒除號碼 ' },
  { key: 'B1+B2 加蓋號碼' },
  { key: '本班備用數' },
  { key: '本班養身數' },
].map((d, idx) => createStatisticBodyData(d, idx));

export const CurrentShiftTotalForm = () => {
  const classes = useStyles();

  return (
    <SectionWrapper icon={<ViewListRounded color="primary" fontSize="large" />} title="本班統計">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Table headers={workAreaHeaders} body={workAreaBody} />
        </Grid>
        <Grid item xs={12}>
          <Table headers={statisticHeaders} body={statisticBody} />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

function createWorkAreaBodyData({ key = '' }, idx: number) {
  return [
    key,
    <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN', suffix: '小時' }]} key={idx} />,
    <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN', suffix: '小時' }]} key={idx} />,
    <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN', suffix: '小時' }]} key={idx} />,
  ];
}

function createStatisticBodyData({ key = '' }, idx: number) {
  return [key, <AutocompleteField dense placeholder="NN" options={TdOptions} key={idx} />];
}
