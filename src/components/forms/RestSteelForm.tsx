import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { MultiTextField } from '../../ui/TextField';
import { TableForm } from '../../ui/TableForm';
import { PopRadioGroupField } from '../../ui/PopRadioGroupField';
import { NumberControlField } from '../../ui/NumberControlField';
import { SelectField } from '../../ui/SelectField';
import { RadioGroupField } from '../../ui/RadioGroupField';

interface IRestSteelFormProps {
  onChange: (v: any) => void;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      marginTop: theme.spacing(4),
    },
    row: {
      marginBottom: theme.spacing(4),
    },
    tabs: {
      '& .MuiTab-root': {
        fontSize: theme.typography.h5.fontSize,
        minWidth: 200,
      },
    },
    textInput: {
      width: 100,
      '& .MuiInputBase-input': {
        textAlign: 'center',
      },
      '& fieldset': {
        border: 'none',
      },
    },
  }),
  { name: 'RestSteelForm' },
);

const selectOptions = [
  { label: 'A-光和', value: 'A' },
  { label: 'B-友和', value: 'B' },
  { label: 'C-三和', value: 'C' },
  { label: 'D-東京', value: 'D' },
];

const materialOptions = [
  { label: '正常' },
  { label: '破碎' },
  { label: '倒塌' },
  { label: '融蝕' },
];

export const RestSteelForm = ({ onChange, ...props }: IRestSteelFormProps) => {
  const [state, setState] = useState<any>({});
  const classes = useStyles();

  const handleChange = (k: string) => (v: any) => {
    setState((prev: any) => ({ ...prev, [k]: v }));
    onChange(v);
  };

  const eventHandleFormField = [
    {
      label: '倒次',
      control: () => (
        <PopRadioGroupField onChange={handleChange('倒次')}>
          {state['倒次']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '燒結',
      control: () => (
        <PopRadioGroupField onChange={handleChange('燒結')}>
          {state['燒結']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '太薄',
      control: () => (
        <PopRadioGroupField onChange={handleChange('燒結')}>
          {state['燒結']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '凹襯',
      control: () => (
        <PopRadioGroupField onChange={handleChange('凹襯')}>
          {state['凹襯']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '沖區',
      control: () => (
        <PopRadioGroupField onChange={handleChange('沖區')}>
          {state['沖區']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '澆水',
      control: () => (
        <TextField
          variant="outlined"
          margin="dense"
          placeholder={'HH:MM'}
          value={state['澆水']}
          onChange={handleChange('澆水')}
          className={classes.textInput}
        />
      ),
    },
    {
      label: '厚渣',
      control: () => (
        <PopRadioGroupField onChange={handleChange('厚渣')}>
          {state['厚渣']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '頂撞',
      control: () => (
        <PopRadioGroupField onChange={handleChange('頂撞')}>
          {state['頂撞']}
        </PopRadioGroupField>
      ),
    },
  ];

  const repairRoundFormField = [
    {
      label: '代數',
      control: () => <NumberControlField onChange={handleChange('代數')} />,
    },
    {
      label: '回數',
      control: () => <NumberControlField onChange={handleChange('回數')} />,
    },
    {
      label: '爐數',
      control: () => <NumberControlField onChange={handleChange('爐數')} />,
    },
  ];

  const venderFormField = [
    {
      label: '塗覆料',
      control: () => (
        <SelectField
          options={selectOptions}
          onChange={handleChange('塗覆料')}
        />
      ),
    },
    {
      label: '噴漿料',
      control: () => (
        <SelectField
          options={selectOptions}
          onChange={handleChange('噴漿料')}
        />
      ),
    },
    {
      label: '背襯材料',
      control: () => (
        <SelectField
          options={selectOptions}
          onChange={handleChange('背襯材料')}
        />
      ),
    },
  ];

  return (
    <Grid container className={classes.container}>
      {/* 1st row */}
      <Grid item container wrap="nowrap" className={classes.row}>
        <Grid item sm={4}>
          <MultiTextField
            onChange={handleChange('殘鋼噸數')}
            fields={[{ label: '殘鋼噸數', placeholder: 'NNN' }]}
          />
        </Grid>
        <Grid item sm>
          <MultiTextField
            onChange={handleChange('殘鋼處理完成時間')}
            fields={[
              { label: '殘鋼處理完成時間', placeholder: 'YYYY-MM-DD' },
              { placeholder: 'HH:MM' },
            ]}
          />
        </Grid>
      </Grid>
      {/* 2st row */}
      <Grid item container className={classes.row}>
        <TableForm label="處理狀況" fields={eventHandleFormField} />
      </Grid>
      {/* 3st row */}
      <Grid item container className={classes.row}>
        <TableForm label="修復回數" fields={repairRoundFormField} />
      </Grid>
      {/* 4st row */}
      <Grid item container alignItems="center" spacing={5} className={classes.row}>
        <Grid item sm="auto" style={{ width: 'auto' }}>
          <TableForm label="殘襯廠商" fields={venderFormField} />
        </Grid>
        <Grid item sm style={{ width: 'auto' }}>
          <RadioGroupField
            label="擋牆材料"
            options={materialOptions}
            onChange={handleChange('擋牆材料')}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
