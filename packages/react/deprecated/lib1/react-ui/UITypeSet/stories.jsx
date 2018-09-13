import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';

import locale from './stories-locale';
import UITypeSet from './index';

storiesOf('UITypeSet', module)
  .addDecorator(story => (
    <IntlProvider {...locale}>
      { story() }
    </IntlProvider>
  ))
  .add('for header', () => <UITypeSet name="header" intlProps={{ id: 'ui.typeset.header' }} />)
  .add('for text', () => <UITypeSet name="text" intlProps={{ id: 'ui.typeset.text' }} />);
