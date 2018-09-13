import React from 'react';
import PropTypes from 'prop-types';

import { App } from 'lib/entity-app';
import ScreenDashboard from 'apps/dashboard/screens/Dashboard';
import theme from 'apps/dashboard/styles';

const AppDashboard = props => (
  <App
    theme={props.theme}
    widgets={props.widgets}
  >
    <ScreenDashboard />
  </App>
);

AppDashboard.propTypes = {
  theme: PropTypes.shape({}),
  widgets: PropTypes.shape({}),
};

AppDashboard.defaultProps = {
  theme,
  widgets: {
    text: 'input',
  },
};

export default AppDashboard;
