import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FormPage } from './pages/FormPage';
import { AppThemeProvider } from './ui/themeProvider';

function App() {
  return (
    <CssBaseline>
      <AppThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <FormPage />
        </MuiPickersUtilsProvider>
      </AppThemeProvider>
    </CssBaseline>
  );
}

export default App;
