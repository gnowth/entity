import PropTypes from 'prop-types';
import React from 'react';
import { App } from '@gnowth/entity-app';

const AppHeader = props => (
  <App>
    <div>Header</div>

    <div>
      { props.children }
    </div>
  </App>
);

AppHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppHeader;
