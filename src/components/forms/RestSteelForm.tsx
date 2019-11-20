import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { MultiTextField } from '../../ui/TextField';
import { TableForm } from '../../ui/TableForm';
import { PopRadioGroupField } from '../../ui/PopRadioGroupField';
import { NumberControlField } from '../../ui/NumberControlField';
import { SelectField } from '../../ui/SelectField';
import { RadioGroupField } from '../../ui/RadioGroupField';
import { venderOptions, materialOptions } from '../../data/comm';

interface IRestSteelFormProps {
  state: any;
  handleChange: (k: string) => (v: any) => void;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      marginTop: theme.spacing(4),
    },
    row: {
      marginBottom: theme.spacing(2),
    },
    tabs: {
      '& .MuiTab-root': {
        fontSize: theme.typography.h5.fontSize,
        minWidth: 200,
      },
    },
    textInput: {
      width: 150,
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

export const RestSteelForm = ({
  handleChange,
  state,
  ...props
}: IRestSteelFormProps) => {
  const classes = useStyles();

  const eventHandleFormField = [
    {
      label: '倒次',
      control: () => (
        <PopRadioGroupField
          value={state['倒次']}
          onChange={handleChange('倒次')}
        >
          {state['倒次']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '燒結',
      control: () => (
        <PopRadioGroupField
          value={state['燒結']}
          onChange={handleChange('燒結')}
        >
          {state['燒結']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '太薄',
      control: () => (
        <PopRadioGroupField
          value={state['太薄']}
          onChange={handleChange('太薄')}
        >
          {state['太薄']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '凹襯',
      control: () => (
        <PopRadioGroupField
          value={state['凹襯']}
          onChange={handleChange('凹襯')}
        >
          {state['凹襯']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '沖區',
      control: () => (
        <PopRadioGroupField
          value={state['沖區']}
          onChange={handleChange('沖區')}
        >
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
          defaultValue={state['澆水']}
          onBlur={e => handleChange('澆水')(e.target.value)}
          className={classes.textInput}
        />
      ),
    },
    {
      label: '厚渣',
      control: () => (
        <PopRadioGroupField
          value={state['厚渣']}
          onChange={handleChange('厚渣')}
        >
          {state['厚渣']}
        </PopRadioGroupField>
      ),
    },
    {
      label: '頂撞',
      control: () => (
        <PopRadioGroupField
          value={state['頂撞']}
          onChange={handleChange('頂撞')}
        >
          {state['頂撞']}
        </PopRadioGroupField>
      ),
    },
  ];

  const repairRoundFormField = [
    {
      label: '代數',
      control: () => (
        <NumberControlField
          value={state['代數']}
          onChange={handleChange('代數')}
        />
      ),
    },
    {
      label: '回數',
      control: () => (
        <NumberControlField
          value={state['回數']}
          onChange={handleChange('回數')}
        />
      ),
    },
    {
      label: '爐數',
      control: () => (
        <NumberControlField
          value={state['爐數']}
          onChange={handleChange('爐數')}
        />
      ),
    },
  ];

  const venderFormField = [
    {
      label: '塗覆料',
      control: () => (
        <SelectField
          value={state['塗覆料']}
          options={venderOptions}
          onChange={handleChange('塗覆料')}
        />
      ),
    },
    {
      label: '噴漿料',
      control: () => (
        <SelectField
          value={state['噴漿料']}
          options={venderOptions}
          onChange={handleChange('噴漿料')}
        />
      ),
    },
    {
      label: '背襯材料',
      control: () => (
        <SelectField
          value={state['背襯材料']}
          options={venderOptions}
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
            label="殘鋼噸數"
            state={state}
            onChange={handleChange}
            fields={[{ placeholder: 'NNN' }]}
          />
        </Grid>
        <Grid item sm>
          <MultiTextField
            label="殘鋼處理完成時間"
            state={state}
            onChange={handleChange}
            fields={[{ placeholder: 'YYYY-MM-DD' }, { placeholder: 'HH:MM' }]}
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
      <Grid
        item
        container
        alignItems="center"
        spacing={5}
        className={classes.row}
      >
        <Grid item sm={6}>
          <TableForm label="殘襯廠商" fields={venderFormField} />
        </Grid>
        <Grid item sm style={{ width: 'auto' }}>
          <RadioGroupField
            value={state['擋牆材料']}
            label="擋牆材料"
            options={materialOptions}
            onChange={handleChange('擋牆材料')}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
