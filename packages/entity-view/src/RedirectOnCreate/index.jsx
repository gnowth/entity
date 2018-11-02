import _flowRight from 'lodash/flowRight';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import { withDefault } from '@gnowth/default';
import { withProps } from '@gnowth/higher-order-component';

class RedirectOnCreate extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const id = props.field.getId(props.value);

    return {
      id,
      shouldRedirect: state.id === undefined && !!id,
    };
  }

  state = {
    shouldRedirect: false,
  };

  render() {
    return this.state.shouldRedirect
      ? <this.props.viewRedirectOnCreate_RedirectComponent to={this.props.to} />
      : null;
  }
}

RedirectOnCreate.propTypes = {
  field: PropTypesEntity.entityField.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypesImmutable.map.isRequired,
};

export default _flowRight(
  withDefault(),
  withProps(props => ({
    viewRedirectOnCreate_RedirectComponent: props.redirectComponent || props.defaults.redirect,
  })),
)(RedirectOnCreate);
