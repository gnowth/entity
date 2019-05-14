import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { withDefault } from '@burnsred/default';

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
    const RedirectComponent = this.props.redirectComponent;

    return this.state.shouldRedirect
      ? <RedirectComponent to={this.props.to} />
      : null;
  }
}

RedirectOnCreate.propTypes = {
  field: PropTypesEntity.entityField.isRequired,
  to: PropTypes.string.isRequired,
  redirectComponent: PropTypesPlus.component.isRequired,
  value: PropTypesImmutable.map.isRequired,
};

export default withDefault({
  redirectComponent: ['entityView_redirect', 'component_redirect'],
})(RedirectOnCreate);
