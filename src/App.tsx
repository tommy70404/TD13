import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FormPage } from './pages/FormPage';
import { AppThemeProvider } from './ui/themeProvider';
import { FormV2Page } from './pages/FormV2Page';
import { FormMenuPage } from './pages/FormMenuPage';
import { TDListPage } from './pages/TDListPage';
import { TDLocationListPage } from './pages/TDLocationListPage';
import { TDLocationPage } from './pages/TDLocationPage';

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
    <AppThemeProvider>
      <CssBaseline>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            {/* <Route path={['/form_1']}>
              <FormPage />
            </Route> */}
            <Route path={['/form/:id']}>
              <FormV2Page />
            </Route>
            <Route path={['/', '/maintenance/menu']} exact>
              <FormMenuPage />
            </Route>
            <Route path={['/maintenance/td-menu/:id']}>
              <TDListPage />
            </Route>
            <Route path={['/TD/locations']} exact>
              <TDLocationListPage />
            </Route>
            <Route path={['/TD/locations/:id']} exact>
              <TDLocationPage />
            </Route>
          </Router>
        </MuiPickersUtilsProvider>
      </CssBaseline>
    </AppThemeProvider>
  );
}

export default App;
