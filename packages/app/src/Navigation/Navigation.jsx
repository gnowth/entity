import _ from 'lodash';
import idx from 'idx';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/theme';

import { Context } from '../context';
import hooks from './Navigation.hooks';

function Navigation(_props) {
  const props = useEnhanceProps(_props, { hooks });
  const context = React.useContext(Context);
  const entity = props.entity || context.entity;

  const { Container, NavLink } = props.hooks.useComponents(props);

  const _navigations = idx(entity, x => x.navigations[props.name]) || [];
  const navigations = _.isFunction(_navigations)
    ? _navigations(props.entityConfigs)
    : _navigations;

  return (
    <Container {...props.hooks.usePropsContainer(props)}>
      { navigations.map(item => (
        <NavLink {...props.hooks.usePropsNavLink(props, { item })} />
      ))}
    </Container>
  );
}

Navigation.propTypes = {
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  entity: PropTypesEntity.entity,
  entityConfigs: PropTypes.shape({}),
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    usePropsContainer: PropTypes.func,
    usePropsNavLink: PropTypes.func,
  }),
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  navLinkComponent: PropTypesPlus.component,
  navLinkComponentProps: PropTypes.shape({}),
  palette: PropTypesPlus.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
};

Navigation.defaultProps = {
  containerComponent: undefined,
  containerComponentProps: undefined,
  entity: undefined,
  entityConfigs: undefined,
  hooks: undefined,
  namespace: 'app_navigation',
  navLinkComponent: undefined,
  navLinkComponentProps: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
};

export default Navigation;
