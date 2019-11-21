import React from 'react';
import TabUnselected from '@material-ui/icons/TabUnselected';
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

const useStyles = makeStyles(
  theme => ({
    '@global': {
      '.fullscreen-enabled': {
        background: 'white',
        overflow: 'scroll',
      },
    },
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
  { name: 'MaintRangeForm' },
);

export const MaintRangeForm = () => {
  const classes = useStyles();

  const venderFormField = [
    {
      label: '塗覆料',
      control: () => (
        <SelectField defaultText="廠商中文名稱" options={venderOptions} />
      ),
    },
    {
      label: '噴漿料',
      control: () => (
        <SelectField defaultText="廠商中文名稱" options={venderOptions} />
      ),
    },
    {
      label: '背襯材料',
      control: () => (
        <SelectField defaultText="廠商中文名稱" options={venderOptions} />
      ),
    },
  ];
  const eventHandleFormField = [
    {
      label: '倒次',
      control: () => (
        <MultiTextField
          fields={[{ placeholder: 'NN' }]}
          style={{ width: 102, padding: 4 }}
        />
      ),
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

  const repairTypeField = [
    {
      label: '澆注材',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商中文名稱" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
    {
      label: '修補材',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商中文名稱" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
  ];
  const paintTypeField = [
    {
      label: '塗附材',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商中文名稱" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
    {
      label: '噴漿材',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商中文名稱" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
  ];

  const spoutField = [
    {
      label: '大擋牆',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商名" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
    {
      label: '小擋牆',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField
              defaultText="廠商名"
              options={venderOptions}
              style={{ padding: 8 }}
            />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
    {
      label: '作業磚',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商名" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
    {
      label: '回收磚',
      controlGroup: [
        {
          label: '廠商',
          control: () => (
            <SelectField defaultText="廠商名" options={venderOptions} />
          ),
        },
        {
          label: '數量',
          control: () => (
            <MultiTextField
              textCenter
              fields={[{ placeholder: 'NN' }]}
              style={{ padding: 8 }}
            />
          ),
        },
      ],
    },
  ];

  return (
    <SectionWrapper
      icon={<TabUnselected color="primary" fontSize="large" />}
      title="維護範圍"
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={3}
        className={classes.row}
      >
        {/* 1st row */}
        <Grid
          item
          container
          xs={12}
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <MaintRangeGrapgicFormV2 />
        </Grid>
        {/* 2nd row */}
        <Grid
          item
          container
          xs={12}
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <RadioGroupField label="修別" options={repairTypeOptions} vertical />
          <TableForm fieldGroup={repairTypeField} vertical />
        </Grid>
        {/* 3rd row */}
        <Grid
          item
          container
          xs={12}
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <RadioGroupField label="塗附別" options={paintOptions} vertical />
          <TableForm fieldGroup={paintTypeField} vertical />
        </Grid>
        {/* 4th row */}
        <Grid
          item
          container
          xs={12}
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <RadioGroupField label="澆口箱" options={spoutOptions} vertical />
          <TableForm fieldGroup={spoutField} vertical />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};
