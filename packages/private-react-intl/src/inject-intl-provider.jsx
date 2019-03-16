import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import { IntlContext } from './context';

const ContextProvider = props => (
  <IntlContext.Provider value={props.intl}>
    { props.children }
  </IntlContext.Provider>
);

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ContextProvider);
