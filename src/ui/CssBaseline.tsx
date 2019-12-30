import React from 'react';
import { default as MuiCssBaseline, CssBaselineProps } from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      '&::-webkit-scrollbar': {
        width: '0',
        height: '0',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
      },
    },
  },
}));

export function CssBaseline(props: CssBaselineProps) {
  useStyles();
  return (
    <>
      <MuiCssBaseline>{props.children}</MuiCssBaseline>
    </>
  );
}
