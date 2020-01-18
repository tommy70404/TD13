import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FormPage } from './pages/FormPage';
import { CssBaseline } from './ui/CssBaseline';
import { AppThemeProvider } from './ui/themeProvider';
import { FormV2Page } from './pages/FormV2Page';
import { FormMenuPage } from './pages/FormMenuPage';
import { TDListPage } from './pages/TDListPage';
import { TDLocationListPage } from './pages/TDLocationListPage';
import { TDLocationPage } from './pages/TDLocationPage';
import { WorkLogMenuPage } from './pages/workLog/WorkLogMenuPage';
import { WorkLogFormMenuPage } from './pages/workLog/WorkLogFormMenuPage';
import { WorkLogFormPage } from './pages/workLog/WorkLogFormPage';

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
            <Route path={['/form/:id']} exact component={FormV2Page} />

            <Route path={['/', '/maintenance/menu']} exact component={FormMenuPage} />
            <Route path={['/maintenance/work_log']} exact component={WorkLogMenuPage} />
            <Route path={['/maintenance/work_log/:id/menu']} exact component={WorkLogFormMenuPage} />
            <Route path={['/maintenance/work_log/:id/form']} exact component={WorkLogFormPage} />
            <Route path={['/maintenance/td_menu/:id']} component={TDListPage} />

            <Route path={['/TD/locations']} exact component={TDLocationListPage} />
            <Route path={['/TD/locations/:id']} exact component={TDLocationPage} />
          </Router>
        </MuiPickersUtilsProvider>
      </CssBaseline>
    </AppThemeProvider>
  );
}

export default App;
