import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const appTheme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        fontSize: '1.4rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#f5a623',
    },
  },
  typography: {
    h1: {
      fontWeight: 'bolder',
    },
    h2: {
      fontWeight: 'bolder',
    },
    h3: {
      fontWeight: 'bolder',
    },
    h4: {
      fontWeight: 'bolder',
    },
    h5: {
      fontWeight: 'bolder',
    },
    h6: {
      fontWeight: 'bolder',
    },
  },
});

export const AppThemeProvider: React.FunctionComponent<any> = props => (
  <MuiThemeProvider theme={appTheme}>{props.children}</MuiThemeProvider>
);
