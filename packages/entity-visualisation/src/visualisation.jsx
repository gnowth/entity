import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import React from 'react';

import hooks from './visualisation.hooks';

function Visualisation(props) {
  const visualisationRef = React.useRef({});

  visualisationRef.current = {
    ...props,
    nodes: hooks.useNodes(props),
  };

  hooks.useRenderVisualisation(props, visualisationRef);
  hooks.useUnmount(visualisationRef);

  return props.children || null;
}

Visualisation.propTypes = {
  entity: PropTypesEntity.entity.isRequired,
  getData: PropTypes.func,
  onNodeEnter: PropTypes.func.isRequired,
  onNodeExit: PropTypes.func,
  onNodeUpdate: PropTypes.func,
  onNodeUpdateOnly: PropTypes.func,
  onUnmount: PropTypes.func,
  select: PropTypes.string.isRequired,
};

Visualisation.defaultProps = {
  getData: data => data,
  getId: ({ entity, value }) => entity.getId(value),
  onNodeExit: nodes => nodes.remove(),
  onNodeUpdate: nodes => nodes,
  onNodeUpdateOnly: nodes => nodes,
  onUnmount: nodes => nodes,
};

export default React.memo(Visualisation);
