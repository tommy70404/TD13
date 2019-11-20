import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FormPage } from './pages/FormPage';
import { AppThemeProvider } from './ui/themeProvider';
import { FormV2Page } from './pages/FormV2Page';

function App() {
  // useEffect(() => {
  //   const elem = document.documentElement;
  //   (function toggleFullScreen() {
  //     var doc: any = window.document;
  //     var docEl: any = doc.documentElement;

  //     var requestFullScreen =
  //       docEl.requestFullscreen ||
  //       docEl.mozRequestFullScreen ||
  //       docEl.webkitRequestFullScreen ||
  //       docEl.msRequestFullscreen;
  //     var cancelFullScreen =
  //       doc.exitFullscreen ||
  //       doc.mozCancelFullScreen ||
  //       doc.webkitExitFullscreen ||
  //       doc.msExitFullscreen;
  //     try {
  //       if (
  //         !doc.fullscreenElement &&
  //         !doc.mozFullScreenElement &&
  //         !doc.webkitFullscreenElement &&
  //         !doc.msFullscreenElement
  //       ) {
  //         requestFullScreen.call(docEl);
  //       }
  //     } catch {
  //       cancelFullScreen.call(doc);
  //     }
  //   })();
  // }, []);
  return (
    <CssBaseline>
      <AppThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <Route path={['/form_1']}>
              <FormPage />
            </Route>
            <Route path={['/form_2', '/']}>
              <FormV2Page />
            </Route>
          </Router>
        </MuiPickersUtilsProvider>
      </AppThemeProvider>
    </CssBaseline>
  );
}

export default App;
