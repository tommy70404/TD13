import React from 'react';
import ViewList from '@material-ui/icons/ViewList';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Checkbox } from '@material-ui/core';

import { SectionWrapper } from '../../../ui/SectionWrapper';
import { MultiTextField } from '../../../ui/TextField';
import { SelectField } from '../../../ui/SelectField';
import { venderOptions, materialOptions, repairReasonOptions } from '../../../data/comm';
import { TableForm } from '../../../ui/TableForm';
import { RadioGroupField } from '../../../ui/RadioGroupField';
import { PopGraphicField } from '../../../ui/PopGraphicField';
import { DateField } from '../../../ui/DateField';

const useStyles = makeStyles(
  theme => ({
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
  }),
  { name: 'MaintForm' },
);

export const MaintForm = () => {
  const classes = useStyles();

  const venderFormField = [
    {
      label: '塗覆料',
      control: () => <SelectField defaultText="廠商中文名稱" options={venderOptions} />,
    },
    {
      label: '噴漿料',
      control: () => <SelectField defaultText="廠商中文名稱" options={venderOptions} />,
    },
    {
      label: '背襯材料',
      control: () => <SelectField defaultText="廠商中文名稱" options={venderOptions} />,
    },
  ];
  const eventHandleFormField = [
    {
      label: '倒次',
      control: () => <MultiTextField fields={[{ placeholder: 'NN' }]} style={{ width: 102, padding: 4 }} />,
    },
    {
      label: '燒結',
      control: () => <PopGraphicField title="燒結" />,
    },
    {
      label: '太薄',
      control: () => <PopGraphicField title="太薄" />,
    },
    {
      label: '凹襯',
      control: () => <PopGraphicField title="凹襯" />,
    },
    {
      label: '沖區',
      control: () => <PopGraphicField title="沖區" />,
    },
    {
      label: '澆水',
      control: () => <Checkbox size="medium" color="primary" />,
    },
    {
      label: '厚渣',
      control: () => <PopGraphicField title="厚渣" />,
    },
    {
      label: '頂撞',
      control: () => <PopGraphicField title="頂撞" />,
    },
  ];

  return (
    <SectionWrapper icon={<ViewList color="primary" fontSize="large" />} title="送修資料">
      <Grid container justify="space-between" alignItems="center" spacing={3} className={classes.row}>
        {/* 1st row */}
        <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
          <Grid item xs={4}>
            <MultiTextField
              label="送修序號"
              // state={state}
              // onChange={()=>()}
              fields={[{ placeholder: 'YYYY-MM-NNN' }]}
              vertical
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <DateField label="送修時間" placeholder="YYYY-MM-DD" withDayTime />
          </Grid>
          <Grid item xs={4}>
            <MultiTextField
              label="連續爐數"
              // state={state}
              // onChange={()=>()}
              fields={[{ placeholder: 'NN' }]}
              vertical
              fullWidth
            />
          </Grid>
        </Grid>
        {/* 2nd row */}
        <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
          <Grid item xs={4}>
            <DateField label="S/N 到除時間" placeholder="YYYY-MM-DD" withDayTime />
          </Grid>
          <Grid item xs={4}>
            <DateField
              label="殘剛處理完成時間"
              placeholder="YYYY-MM-DD"
              withDayTime
            />
          </Grid>
          <Grid item xs={4}>
            <MultiTextField
              label="殘剛噸數"
              // state={state}
              // onChange={()=>()}
              fields={[{ placeholder: 'NN', suffix: '噸' }]}
              vertical
              fullWidth
            />
          </Grid>
        </Grid>
        {/* 3rd row */}
        <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
          <TableForm label="殘趁廠商" fields={venderFormField} vertical />
        </Grid>
        {/* 4th row */}
        <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
          <RadioGroupField label="擋牆狀況" options={materialOptions} vertical />
          <RadioGroupField label="修復原因" options={repairReasonOptions} vertical />
        </Grid>
        {/* 5th row */}
        <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
          <TableForm label="處理狀況" fields={eventHandleFormField} vertical />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};
