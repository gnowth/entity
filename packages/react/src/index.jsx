import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoot } from '@gnowth/entity-app';
import { DuckProvider, QueryDuck } from '@gnowth/entity-duck';
import { FormDefaultProvider } from '@gnowth/entity-form';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { HashRouter as Router } from 'react-router-dom';

import theme from 'styles';
import store, { history } from 'store';

import UIButton from 'lib/ui/Button';
import UILabel from 'lib/ui/Label';
import UIProgressCircle from 'lib/ui/ProgressCircle';
import WidgetAttachment from 'apps/filer/widgets/Attachment';
import WidgetBoolean from 'lib/entity-widget/Boolean';
import WidgetDate from 'lib/entity-widget/Date';
import WidgetInput from 'lib/entity-widget/Input';
import WidgetSelect from 'lib/entity-widget/Select';
import WidgetTextarea from 'lib/entity-widget/Textarea';

import Routes from './routes';
import setup from './setup';

setup();

function render() {
  ReactDOM.render(
    <AppRoot
      duckProvider={DuckProvider}
      duckProviderProps={{
        store,
        processingComponent: UIProgressCircle,
        processingDidFailComponent: () => 'Unable to load data. Try to refresh the page',
        recordsCountComponent: ({ value }) => `${value} Record(s) Found`,
        recordsCountNoneComponent: () => 'No Records Found',
      }}
      formProvider={FormDefaultProvider}
      formProviderProps={{
        defaultComponents: {
          control: UIButton,
          query: QueryDuck,
          wrapper: UILabel,
        },
        defaultWidgets: {
          attachment: WidgetAttachment,
          boolean: WidgetBoolean,
          char: WidgetInput,
          date: WidgetDate,
          entity: WidgetSelect,
          text: WidgetTextarea,
        },
      }}
      intlProvider={IntlProvider}
      intlProviderProps={{ locale: 'en', messages: {} }}
      themeProvider={ThemeProvider}
      themeProviderProps={{ theme }}
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <Routes />
          </Router>
        </ConnectedRouter>
      </Provider>
    </AppRoot>,
    document.getElementById('root'),
  );
}

if (window.Intl) render();
else require.ensure(['intl'], render);
