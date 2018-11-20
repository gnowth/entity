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
  component_button: PropTypesPlus.component,
  component_label: PropTypesPlus.component,
  component_processing: PropTypesPlus.component,
  component_processingDidFail: PropTypesPlus.component,
  component_query: PropTypesPlus.component,
  component_recordCount: PropTypesPlus.component,
  component_recordCountNone: PropTypesPlus.component,
  component_redirect: PropTypesPlus.component,
  settings: PropTypes.shape({}),
  store: PropTypesPlus.store,
  widget_boolean: PropTypesPlus.component,
  widget_char: PropTypesPlus.component,
  widget_date: PropTypesPlus.component,
  widget_entity: PropTypesPlus.component,
  widget_enum: PropTypesPlus.component,
  widget_list: PropTypesPlus.component,
  widget_text: PropTypesPlus.component,
};

DefaultProvider.defaultProps = {
  component_button: undefined,
  component_label: undefined,
  component_processing: undefined,
  component_processingDidFail: undefined,
  component_query: undefined,
  component_recordCount: undefined,
  component_recordCountNone: undefined,
  component_redirect: undefined,
  settings: undefined,
  store: undefined,
  widget_boolean: undefined,
  widget_char: undefined,
  widget_date: undefined,
  widget_entity: undefined,
  widget_enum: undefined,
  widget_list: undefined,
  widget_text: undefined,
};

export default DefaultProvider;
