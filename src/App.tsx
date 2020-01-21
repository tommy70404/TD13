import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FormPage } from './pages/FormPage';
import { CssBaseline } from './ui/CssBaseline';
import { AppThemeProvider } from './ui/themeProvider';
import { FormV2Page } from './pages/FormV2Page';
import { FormMenuPage } from './pages/FormMenuPage';
import { TDListPage } from './pages/td/TDListPage';
import { TDLocationListPage } from './pages/td/TDLocationListPage';
import { TDLocationPage } from './pages/td/TDLocationPage';
import { WorkLogMenuPage } from './pages/workLog/WorkLogMenuPage';
import { WorkLogFormMenuPage } from './pages/workLog/WorkLogFormMenuPage';
import { WorkLogFormPage } from './pages/workLog/WorkLogFormPage';
import { TDStatusMenu } from './pages/td/TDStatusMenu';
import { TDStatusList } from './pages/td/TDStatusList';
import { TDHistoryList } from './pages/td/TDHistoryList';

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
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Router>
              {/* <Route path={['/form_1']}>
              <FormPage />
            </Route> */}

              <Route path={['/', '/maintenance/new']} exact component={FormMenuPage} />
              <Route path={['/maintenance/new/:section_id/menu']} component={TDListPage} />
              <Route path={['/maintenance/new/:section_id/:td_id/form']} exact component={FormV2Page} />

              <Route path={['/maintenance/work_log']} exact component={WorkLogMenuPage} />
              <Route path={['/maintenance/work_log/:section_id/menu']} exact component={WorkLogFormMenuPage} />
              <Route path={['/maintenance/work_log/:section_id/form']} exact component={WorkLogFormPage} />

              <Route path={['/TD/locations']} exact component={TDLocationListPage} />
              <Route path={['/TD/locations/:section_id']} exact component={TDLocationPage} />
              <Route path={['/TD/status']} exact component={TDStatusMenu} />
              <Route path={['/TD/status/:section_id']} exact component={TDStatusList} />
              <Route path={['/TD/status/:section_id/:td_id']} exact component={TDHistoryList} />
            </Router>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </CssBaseline>
    </AppThemeProvider>
  );
}

export default App;
