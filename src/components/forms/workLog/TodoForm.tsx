import React from 'react';
import { ViewListRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';

import { SectionWrapper } from '../../../ui/SectionWrapper';
import { MultiTextField } from '../../../ui/TextField';
import { SelectField } from '../../../ui/SelectField';
import { userOptions } from '../../../data/comm';
import { Table } from '../../../ui/Table';

const useStyles = makeStyles(
  theme => ({
    textArea: {
      width: '100%',
    },
  }),
  { name: 'TodoForm' },
);

export const TodoForm = () => {
  const classes = useStyles();

  return (
    <SectionWrapper icon={<ViewListRounded color="primary" fontSize="large" />} title="交辦事項">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <TextField multiline variant="outlined" rows={5} className={classes.textArea} />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};
