import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { MultiTextField } from '../../ui/TextField';
import { SelectField } from '../../ui/SelectField';
import { MaintRangeTable } from '../MaintRangeTable';
import { MaintRangeGraphicForm } from '../MaintRangeGraphicForm';

interface IMaintRangeFormProps {
  state: any;
  handleChange: (k: string) => (v: any) => void;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      marginTop: theme.spacing(2),
    },
    row: {
      marginBottom: theme.spacing(2),
    },
    selectField: {
      minWidth: 100,
      marginLeft: theme.spacing(2.5),
      '& .MuiInputBase-input': {
        textAlign: 'center',
        color: theme.palette.action.disabled,
      },
    },
    inlineTextField: {
      '& .MuiInputBase-root': {
        marginRight: theme.spacing(2.5),
        width: 100,
      },
    },
  }),
  { name: 'MaintRangeForm' },
);

const selectOptions = [
  { label: 'A-光和', value: 'A' },
  { label: 'B-友和', value: 'B' },
  { label: 'C-三和', value: 'C' },
  { label: 'D-東京', value: 'D' },
];

export const MaintRangeForm = ({
  handleChange,
  state,
  ...props
}: IMaintRangeFormProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {/* 1st row */}
      <Grid item container wrap="nowrap" className={classes.row} spacing={7}>
        <Grid
          item
          container
          sm="auto"
          wrap="nowrap"
          alignItems="center"
          style={{ width: 'auto' }}
          className={classes.inlineTextField}
        >
          <MultiTextField
            label="全修背襯灌注材"
            state={state}
            onChange={handleChange}
            fields={[{ placeholder: 'NNNN' }]}
          />
          <Typography variant="h4" color="primary">
            kg
          </Typography>
        </Grid>
        <Grid item container sm="auto" style={{ width: 'auto' }}>
          <SelectField
            label="施工廠商"
            value={state['施工廠商']}
            options={selectOptions}
            onChange={handleChange('施工廠商')}
            className={classes.selectField}
          />
        </Grid>
      </Grid>
      {/* 2st row */}
      <Grid item container wrap="nowrap" className={classes.row}>
        <Grid
          item
          container
          sm={12}
          alignItems="center"
          style={{ width: 'auto' }}
        >
          <MaintRangeGraphicForm state={state} handleChange={handleChange} />
        </Grid>
      </Grid>
      {/* 3st row */}
      <Grid item container wrap="nowrap" className={classes.row}>
        <Grid
          item
          container
          sm={12}
          alignItems="center"
          style={{ width: 'auto' }}
        >
          <MaintRangeTable />
        </Grid>
      </Grid>
    </Grid>
  );
};
