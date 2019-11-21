import React from 'react';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import NotoSansTCRegularOtf from '../assets/font/NotoSansTC-Regular.otf';
import NotoSansTCMediumOtf from '../assets/font/NotoSansTC-Medium.otf';
import NotoSansTCBoldOtf from '../assets/font/NotoSansTC-Bold.otf';

const NotoSansTCRegular = {
  fontFamily: 'Noto Sans TC',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    url(${NotoSansTCRegularOtf}) format('openType')
  `,
};
const NotoSansTCMedium = {
  fontFamily: 'Noto Sans TC',
  fontStyle: 'normal',
  fontWeight: 500,
  src: `
    url(${NotoSansTCMediumOtf}) format('openType')
  `,
};
const NotoSansTCBold = {
  fontFamily: 'Noto Sans TC',
  fontStyle: 'normal',
  fontWeight: 700,
  src: `
    url(${NotoSansTCBoldOtf}) format('openType')
  `,
};

const appTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [NotoSansTCRegular, NotoSansTCMedium, NotoSansTCBold],
      },
    },
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
    fontFamily: ['"Noto Sans TC"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 'bolder',
    },
    h2: {
      fontWeight: 'bolder',
    },
    h3: {
      fontSize: 30,
      fontWeight: 'bolder',
    },
    h4: {
      fontSize: 26,
      fontWeight: 'bolder',
    },
    h5: {
      fontSize: 22,
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
