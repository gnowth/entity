import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import { Provider } from './context';

const DefaultProvider = ({ children, ...props }) => (
  <Provider value={props}>
    { children }
  </Provider>
);

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
  componentControl: PropTypesPlus.component,
  componentLabel: PropTypesPlus.component,
  componentProcessing: PropTypesPlus.component,
  componentProcessingDidFail: PropTypesPlus.component,
  componentQuery: PropTypesPlus.component,
  componentRecordCount: PropTypesPlus.component,
  componentRecordCountNone: PropTypesPlus.component,
  store: PropTypesPlus.store,
  widgets: PropTypes.shape({
    boolean: PropTypesPlus.component,
    char: PropTypesPlus.component,
    date: PropTypesPlus.component,
    entity: PropTypesPlus.component,
    text: PropTypesPlus.component,
  }),
};

DefaultProvider.defaultProps = {
  componentControl: undefined,
  componentLabel: undefined,
  componentProcessing: undefined,
  componentProcessingDidFail: undefined,
  componentQuery: undefined,
  componentRecordCount: undefined,
  componentRecordCountNone: undefined,
  store: undefined,
  widgets: {},
};

export default DefaultProvider;
