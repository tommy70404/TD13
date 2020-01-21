import React from 'react';
import { ViewListRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { SectionWrapper } from '../../../ui/SectionWrapper';
import { MultiTextField } from '../../../ui/TextField';
import { SelectField } from '../../../ui/SelectField';
import { userOptions } from '../../../data/comm';
import { Table } from '../../../ui/Table';

const useStyles = makeStyles(theme => ({}), { name: 'OnDutyForm' });

const headers = [{ label: '工作人員', width: 250 }, { label: '本班', width: 200 }, { label: '加班', width: 150 }];
const body = [{}, {}].map((d, idx) => createBodyData(d, idx));

export const OnDutyForm = () => {
  const classes = useStyles();

  return (
    <SectionWrapper icon={<ViewListRounded color="primary" fontSize="large" />} title="出勤紀錄">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Table headers={headers} body={body} />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

function createBodyData({ key = '' }, idx: number) {
  return [
    <SelectField dense defaultText="工作人員名稱" options={userOptions} key={idx} />,
    <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN', suffix: '小時' }]} key={idx} />,
    <MultiTextField dense textCenter fields={[{ placeholder: 'NNNNN', suffix: '小時' }]} key={idx} />,
  ];
}
