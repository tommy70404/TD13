import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
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
  newOldOptions,
} from '../../../data/comm';
import { Table } from '../../../ui/Table';
import { RadioGroupField } from '../../../ui/RadioGroupField';

const useStyles = makeStyles(theme => ({}), { name: 'FinishDataForm' });

export const FinishDataForm = () => {
  const classes = useStyles();

  return (
    <SectionWrapper icon={<CheckCircle color="primary" fontSize="large" />} title="完工資料">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Grid item container xs={12}>
          <Grid item container xs>
            <Grid item>
              <RadioGroupField label="上蓋氣環" options={newOldOptions} vertical />
            </Grid>
            <Grid item>
              <RadioGroupField label="上蓋套環" options={newOldOptions} vertical />
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={3}>
            <Grid item xs>
              <MultiTextField label="塗附完成時間" fields={[{ placeholder: 'YYYY-MM-DD' }, { placeholder: 'HH:MM' }]} />
            </Grid>
            <Grid item xs>
              <MultiTextField
                label="BTD 送澆鑄時間"
                fields={[{ placeholder: 'YYYY-MM-DD' }, { placeholder: 'HH:MM' }]}
              />
            </Grid>
            <Grid item xs>
              <MultiTextField label="交件時間" fields={[{ placeholder: 'YYYY-MM-DD' }, { placeholder: 'HH:MM' }]} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};
