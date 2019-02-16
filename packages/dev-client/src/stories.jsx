import centered from '@storybook/addon-centered';
import React from 'react';
import { createStoriesForTheme, defaultTheme, GlobalStyles } from '@gnowth/style';
import { createStoriesForUI } from '@gnowth/ui';
import { createStoriesForWidget } from '@entity/widget';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';

const computedTheme = { ...defaultTheme, ...theme };

const storyFactory = story => chapter => storiesOf(`${story}/${chapter}`, module)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withNotes)
  .addDecorator(withOptions({ sortStoriesByKind: true }))
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <IntlProvider locale="en" messages={{}}>
      { storyFn() }
    </IntlProvider>
  ))
  .addDecorator(storyFn => (
    <ThemeProvider theme={computedTheme}>
      <>
        { storyFn() }

        <GlobalStyles />
      </>
    </ThemeProvider>
  ));


createStoriesForTheme(storyFactory('Theme'));
createStoriesForUI(storyFactory('UI'));
createStoriesForWidget(storyFactory('Widget'));
