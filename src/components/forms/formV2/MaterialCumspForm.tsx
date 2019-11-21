import React from 'react';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
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

const useStyles = makeStyles(theme => ({}), { name: 'MaterialCumspForm' });

export const MaterialCumspForm = () => {
  const classes = useStyles();

  const headers = [
    { label: '材料別', width: 250 },
    { label: '廠商', width: 200 },
    { label: '規格', width: 150 },
    { label: '數量', width: 150 },
    { label: '單位', width: 100 },
    { label: '備註'},
  ];
  const body = [
    [
      '塗附材',
      <SelectField dense options={venderOptions} />,
      '',
      <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN' }]} />,
      'KG',
      <MultiTextField dense textCenter fields={[{ placeholder: '' }]} />,
    ],
    [
      '噴漿料',
      <SelectField dense options={venderOptions} />,
      '',
      <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN' }]} />,
      'KG',
      <MultiTextField dense textCenter fields={[{ placeholder: '' }]} />,
    ],
  ];

  return (
    <SectionWrapper icon={<SettingsApplications color="primary" fontSize="large" />} title="修護範圍">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Table headers={headers} body={body} />
      </Grid>
    </SectionWrapper>
  );
};
