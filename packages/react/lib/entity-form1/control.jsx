import _compose from 'lodash/fp/compose';
import React from 'react';

import { withFormDefault } from './context';
import withInput from './withInput';

class Control extends React.Component {
  render() {
    return <this.props.component />;
  }
}

Control.propTypes = {
  component: PropTypesPlus.component.isRequired,
};

Control.defaultProps = {

};

export default _compose(
  withFormDefault,
  withInput,
  withPropTypes(props => ({
    propTypes: {

    },
    defaultProps: {
      component: props.defaultControls[props.type || 'default']
    },
  })),
)(Control);
