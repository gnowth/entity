/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';

import settings from 'settings';
import setup from 'src/setup';
import store, { history } from 'store';
import App from 'src/app';

setup(settings);

const componentReq = require.context('src', true, /stories\.jsx$/);

addDecorator(withNotes);

addDecorator(withOptions({
  sortStoriesByKind: true,
}));

addDecorator(story => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        { story() }
      </App>
    </ConnectedRouter>
  </Provider>
));

configure(() => {
  componentReq.keys().forEach(filename => componentReq(filename));
}, module);
