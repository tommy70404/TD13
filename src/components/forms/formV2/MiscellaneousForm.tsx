import React from 'react';
import Build from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Checkbox } from '@material-ui/core';

import { SectionWrapper } from '../../../ui/SectionWrapper';
import { MultiTextField } from '../../../ui/TextField';
import { SelectField } from '../../../ui/SelectField';
import {
  venderOptions,
  materialOptions,
  repairReasonOptions,
  repairTypeOptions,
  paintOptions,
  spoutOptions,
} from '../../../data/comm';
import { TableForm } from '../../../ui/TableForm';
import { RadioGroupField } from '../../../ui/RadioGroupField';
import { PopGraphicField } from '../../../ui/PopGraphicField';
import { MaintRangeGrapgicFormV2 } from '../../MaintRangeGrapgicFormV2';
import { Table } from '../../../ui/Table';

const useStyles = makeStyles(theme => ({}), { name: 'MiscellaneousForm' });

export const MiscellaneousForm = () => {
  const classes = useStyles();

  const headers = [
    { label: '項目', width: 250 },
    { label: '廠商', width: 200 },
    { label: '規格', width: 150 },
    { label: '數量', width: 150 },
    { label: '單位', width: 100 },
    { label: '備註' },
  ];
  const body = [
    { key: '雜焊錨釘', spec: '', unit: 'PC' },
    { key: '雜項澆注', spec: '', unit: 'KG' },
    { key: '雜項砌磚', spec: '', unit: 'PC' },
    { key: '打除中蓋', spec: '', unit: 'PC' },
    { key: '澆注中蓋', spec: '', unit: 'KG' },
    { key: '打除邊蓋', spec: '', unit: 'PC' },
    { key: '澆注邊蓋', spec: '', unit: 'KG' },
    { key: '套環回收', spec: '', unit: 'PC' },
    { key: '氣環回收', spec: '', unit: 'PC' },
    { key: '滑板拆卸', spec: '', unit: 'KG' },
  ].map(d => createBodyData(d));

  return (
    <SectionWrapper icon={<Build color="primary" fontSize="large" />} title="雜項施工">
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
