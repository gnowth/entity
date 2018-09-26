import PropTypes from 'prop-types';
import React from 'react';
import { App } from '@gnowth/entity-app';

import { Content, Header } from './styles';

const AppHeader = props => (
  <App>
    <Header>Header</Header>

    <Content>
      { props.children }
    </Content>
  </App>
);

AppHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppHeader;
