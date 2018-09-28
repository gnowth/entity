import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoot } from '@gnowth/app';
import { DuckProvider, QueryDuck } from '@entity/duck';
import { FormDefaultProvider } from '@entity/form';
import { WidgetBoolean, WidgetDate, WidgetInput, WidgetSelect, WidgetTextarea } from '@entity/widget';
import { UIButton, UIError, UILabel, UIProgressCircle } from '@gnowth/ui';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { HashRouter as Router } from 'react-router-dom';

import theme from 'styles';
import settings from 'settings';
import store, { history } from 'store';
import WidgetAttachment from 'apps/filer/widgets/Attachment';

import Routes from './routes';
import setup from './setup';

setup({ settings, theme });

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
          error: UIError,
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

export default {
  button: 'UIButton',
  error: 'UIError',
  formProvider: 'FormProvider',
  label: 'UILabel',
  processing: 'UIProcessing',
  processingDidFail: () => 'Unable to load data. Try to refresh the page',
  query: 'QueryDuck',
  recordCount: ({ value }) => `${value} Record(s) Found`,
  recordCountNone: () => 'No Records Found',
  widget: {
    char: 'WidgetInput',
    date: 'WidgetDate',
    text: 'WidgetTextarea',
  },
};
