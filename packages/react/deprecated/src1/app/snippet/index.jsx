import React from 'react';
import PropTypes from 'prop-types';

import { PropTypesEntity } from 'lib/entity';
import { App } from 'lib/entity-app';

import entity from './entities/App';
import theme from './styles';
import routes from './routes';

const SnippetApp = props => (
  <App {...props} />
);

SnippetApp.propTypes = {
  entity: PropTypesEntity.entity,
  theme: PropTypes.shape({}),
  routes: PropTypes.func,
};

SnippetApp.defaultProps = {
  entity,
  theme,
  routes,
};

export default SnippetApp;
