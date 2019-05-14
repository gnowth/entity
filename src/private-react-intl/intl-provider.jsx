import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider as IntlProviderLegacy } from 'react-intl';

import InjectIntlProvider from './inject-intl-provider';

const IntlProvider = props => (
  <IntlProviderLegacy {...props}>
    <InjectIntlProvider>
      { props.children }
    </InjectIntlProvider>
  </IntlProviderLegacy>
);

IntlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IntlProvider;
