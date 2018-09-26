import React from 'react';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Link } from 'react-router';

import { filterProps } from '../withPropsFiltered';

// TODO add check that entity has toLink
const WidgetLink = props => (
  <Link
    to={props.field.entity.toLink(props.value)}
    {...filterProps(props)}
  />
);

WidgetLink.propTypes = {
  children: PropTypes.node,
  value: PropTypesImmutable.map.isRequired,
  field: PropTypesEntity.entityField.isRequired,
};

WidgetLink.defaultProps = {
  children: 'View',
};

export default styled(WidgetLink)`
  ${props => props.theme.components?.widgetLink}
  ${props => props.css}
`;
