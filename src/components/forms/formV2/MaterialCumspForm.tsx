import React from 'react';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { SectionWrapper } from '../../../ui/SectionWrapper';
import { MultiTextField } from '../../../ui/TextField';
import { SelectField } from '../../../ui/SelectField';
import { venderOptions } from '../../../data/comm';
import { Table } from '../../../ui/Table';

const useStyles = makeStyles(theme => ({}), { name: 'MaterialCumspForm' });

export const MaterialCumspForm = () => {
  const classes = useStyles();

  const headers = [
    { label: '材料別', width: 250 },
    { label: '廠商', width: 200 },
    { label: '規格', width: 150 },
    { label: '數量', width: 150 },
    { label: '單位', width: 100 },
    { label: '備註' },
  ];
  const body = [
    { key: '塗附材', spec: '', unit: 'KG' },
    { key: '噴漿材', spec: '', unit: 'KG' },
    { key: '搗固材', spec: '', unit: 'KG' },
    { key: '修補材', spec: '', unit: 'KG' },
    { key: '澆注材_1', spec: '', unit: 'KG' },
    { key: '澆注材_2', spec: '', unit: 'KG' },
    { key: '澆注材_3', spec: '', unit: 'KG' },
    { key: '大擋牆', spec: '', unit: 'PC' },
    { key: '小擋牆', spec: '', unit: 'PC' },
    { key: '作業磚', spec: '', unit: 'PC' },
    { key: '回收磚', spec: '', unit: 'PC' },
    { key: '氣密材', spec: '', unit: 'KG' },
    { key: '耐火泥', spec: '', unit: 'KG' },
    { key: '衝擊塊', spec: '', unit: 'PC' },
    { key: '流鋼嘴座(第一道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴座(第二道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴座(第三道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴座(第四道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴(第一道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴(第二道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴(第三道)', spec: '', unit: 'PC' },
    { key: '流鋼嘴(第四道)', spec: '', unit: 'PC' },
  ].map(d => createBodyData(d));

  return (
    <SectionWrapper icon={<SettingsApplications color="primary" fontSize="large" />} title="修護範圍">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Table headers={headers} body={body} />
      </Grid>
    </SectionWrapper>
  );
};

function createBodyData({ key = '', spec = '', unit = '' }) {
  return [
    key,
    <SelectField dense options={venderOptions} />,
    spec,
    <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN' }]} />,
    unit,
    <MultiTextField dense textCenter fields={[{ placeholder: '' }]} />,
  ];
}
